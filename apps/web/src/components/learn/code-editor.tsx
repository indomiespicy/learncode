"use client";

import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { SubmissionStatus } from "../../../../backend/generated/prisma/enums";

interface CodeEditorProps {
  initialCode: string;
  language: string;
  testCases: { input: string; expectedOutput: string; isHidden: boolean }[];
  onSubmit: (code: string) => Promise<void>;
  isSubmitting: boolean;
  lastSubmission?: {
    status: SubmissionStatus;
    passedTests: number;
    totalTests: number;
    stdout?: string;
    stderr?: string;
  };
}

export const CodeEditor = ({
  initialCode,
  language,
  testCases,
  onSubmit,
  isSubmitting,
  lastSubmission,
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const editorRef = useRef<{ getValue: () => string } | null>(null);

  const handleEditorDidMount = (editor: { getValue: () => string }) => {
    editorRef.current = editor;
  };

  const handleSubmit = async () => {
    if (editorRef.current) {
      const currentCode = editorRef.current.getValue();
      await onSubmit(currentCode);
    }
  };

  const getStatusColor = (status: SubmissionStatus) => {
    switch (status) {
      case SubmissionStatus.ACCEPTED:
        return "bg-green-500";
      case SubmissionStatus.WRONG_ANSWER:
        return "bg-red-500";
      case SubmissionStatus.RUNTIME_ERROR:
        return "bg-orange-500";
      case SubmissionStatus.COMPILE_ERROR:
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Code Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <Editor
            height="400px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              scrollBeyondLastLine: false,
            }}
          />
          <div className="mt-4 flex justify-between items-center">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6"
            >
              {isSubmitting ? "Running..." : "Run Code"}
            </Button>
            {lastSubmission && (
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(lastSubmission.status)}>
                  {lastSubmission.status.replace("_", " ")}
                </Badge>
                <span className="text-sm text-gray-600">
                  {lastSubmission.passedTests}/{lastSubmission.totalTests} tests
                  passed
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Test Cases Display */}
      <Card>
        <CardHeader>
          <CardTitle>Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {testCases
              .filter((tc) => !tc.isHidden)
              .map((testCase, index) => (
                <div key={index} className="border rounded p-3">
                  <div className="text-sm">
                    <strong>Input:</strong> {testCase.input}
                  </div>
                  <div className="text-sm">
                    <strong>Expected Output:</strong> {testCase.expectedOutput}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Output Display */}
      {lastSubmission && (
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            {lastSubmission.stdout && (
              <div className="mb-2">
                <strong>Stdout:</strong>
                <pre className="bg-gray-100 p-2 rounded text-sm mt-1">
                  {lastSubmission.stdout}
                </pre>
              </div>
            )}
            {lastSubmission.stderr && (
              <div>
                <strong>Stderr:</strong>
                <pre className="bg-red-100 p-2 rounded text-sm mt-1">
                  {lastSubmission.stderr}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
