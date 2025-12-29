import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { SubmissionStatus } from 'generated/prisma/enums';
import { Judge0Service } from 'src/judge0/judge0.service';
import { TestCaseService } from 'src/test-case/test-case.service';

@Injectable()
export class SubmissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly judge0Service: Judge0Service,
    private readonly testCaseService: TestCaseService,
  ) {}

  async findAll() {
    return await this.prisma.userSubmission.findMany();
  }

  async findByUserId(userId: string) {
    return await this.prisma.userSubmission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return await this.prisma.userSubmission.findUnique({
      where: { id },
    });
  }

  async create(userId: string, createSubmissionDto: CreateSubmissionDto) {
    try {
      return await this.prisma.userSubmission.create({
        data: { ...createSubmissionDto, userId },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    userId: string,
    updateSubmissionDto: UpdateSubmissionDto,
  ) {
    const result = await this.prisma.userSubmission.findFirst({
      where: { id, userId },
    });

    if (!result) throw new NotFoundException('Submission not found');

    return await this.prisma.userSubmission.update({
      where: { id },
      data: updateSubmissionDto,
    });
  }

  async delete(id: string) {
    try {
      return await this.prisma.userSubmission.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Submission not found');
      }
      throw error;
    }
  }

  async createAndExecute(
    userId: string,
    createSubmissionDto: CreateSubmissionDto,
  ) {
    // Create submission record
    const submission = await this.prisma.userSubmission.create({
      data: {
        ...createSubmissionDto,
        userId,
        status: SubmissionStatus.RUNNING,
      },
    });

    try {
      // Get test cases for the lesson
      const testCases = await this.testCaseService.findByLesson(
        createSubmissionDto.lessonId,
      );

      // Run code against test cases
      const testResults = await this.judge0Service.runTestCases(
        createSubmissionDto.code,
        createSubmissionDto.language || 'javascript',
        testCases.map((tc) => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
        })),
      );

      // Update submission with results
      const status =
        testResults.passed === testResults.total
          ? SubmissionStatus.ACCEPTED
          : SubmissionStatus.WRONG_ANSWER;

      await this.prisma.userSubmission.update({
        where: { id: submission.id },
        data: {
          status,
          passedTests: testResults.passed,
          totalTests: testResults.total,
          stdout: testResults.results[0]?.stdout,
          stderr: testResults.results[0]?.stderr,
          time: testResults.results[0]?.time
            ? parseFloat(testResults.results[0].time)
            : null,
          memory: testResults.results[0]?.memory,
        },
      });

      return await this.findOne(submission.id);
    } catch (error) {
      // Update with error status
      await this.prisma.userSubmission.update({
        where: { id: submission.id },
        data: {
          status: SubmissionStatus.RUNTIME_ERROR,
          stderr: error.message,
        },
      });
      throw error;
    }
  }
}
