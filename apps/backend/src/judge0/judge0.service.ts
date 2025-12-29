import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

export interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

export interface Judge0Result {
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  status: {
    id: number;
    description: string;
  };
  time?: string;
  memory?: number;
}

@Injectable()
export class Judge0Service {
  private readonly logger = new Logger(Judge0Service.name);
  private readonly client: AxiosInstance;
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor() {
    this.baseUrl =
      process.env.JUDGE0_BASE_URL || 'https://judge0-ce.p.rapidapi.com';
    this.apiKey = process.env.JUDGE0_API_KEY;

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
    });
  }

  // Language ID mapping for Judge0
  private getLanguageId(language: string): number {
    const languageMap = {
      javascript: 63, // Node.js
      python: 71,
      java: 62,
      cpp: 54,
      c: 50,
      go: 60,
      rust: 73,
      php: 68,
      ruby: 72,
      swift: 83,
      kotlin: 78,
    };
    return languageMap[language.toLowerCase()] || 63; // Default to JavaScript
  }

  async submitCode(
    code: string,
    language: string,
    input?: string,
  ): Promise<Judge0Result> {
    try {
      const submission: Judge0Submission = {
        source_code: code,
        language_id: this.getLanguageId(language),
        stdin: input,
      };

      // Submit code
      const submitResponse = await this.client.post('/submissions', submission);
      const token = submitResponse.data.token;

      // Wait for result (polling)
      let result;
      let attempts = 0;
      const maxAttempts = 10;

      do {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const resultResponse = await this.client.get(`/submissions/${token}`);
        result = resultResponse.data;
        attempts++;
      } while (
        result.status.id <= 2 && // Status 1 = In Queue, 2 = Processing
        attempts < maxAttempts
      );

      return {
        stdout: result.stdout,
        stderr: result.stderr,
        compile_output: result.compile_output,
        status: result.status,
        time: result.time,
        memory: result.memory,
      };
    } catch (error) {
      this.logger.error('Judge0 API error:', error);
      throw error;
    }
  }

  async runTestCases(
    code: string,
    language: string,
    testCases: { input: string; expectedOutput: string }[],
  ): Promise<{
    passed: number;
    total: number;
    results: Judge0Result[];
  }> {
    const results: Judge0Result[] = [];
    let passed = 0;

    for (const testCase of testCases) {
      try {
        const result = await this.submitCode(code, language, testCase.input);
        results.push(result);

        // Check if output matches expected
        const actualOutput = result.stdout?.trim();
        const expectedOutput = testCase.expectedOutput.trim();

        if (result.status.id === 3 && actualOutput === expectedOutput) {
          passed++;
        }
      } catch (error) {
        this.logger.error(`Test case failed:`, error);
        results.push({
          status: { id: 6, description: 'Runtime Error' },
        });
      }
    }

    return { passed, total: testCases.length, results };
  }
}
