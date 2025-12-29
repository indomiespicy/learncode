"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CodeEditor } from "@/components/learn/code-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api, courseBySlugOptions, coursesOptions } from "@/lib/api";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useState, useMemo } from "react";
import { SubmissionStatus } from "../../../../../../../backend/generated/prisma/enums";

// Types
type TestCase = {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
};

type Submission = {
  id: string;
  status: SubmissionStatus;
  passedTests: number | null;
  totalTests: number | null;
  stdout: string | null;
  stderr: string | null;
};

// API functions
const fetchTestCases = async (lessonId: string): Promise<TestCase[]> => {
  return api<TestCase[]>(`/test-cases/lesson/${lessonId}`);
};

const submitCode = async (data: {
  lessonId: string;
  code: string;
  language: string;
}): Promise<Submission> => {
  return api<Submission>("/submission-progresses/execute", {
    method: "POST",
    body: JSON.stringify({
      lessonId: data.lessonId,
      code: data.code,
      language: data.language || "javascript",
    }),
  });
};

const LearnPage = () => {
  const queryClient = useQueryClient();

  // Fetch all courses
  const { data: courses } = useQuery(coursesOptions);

  const firstCourseSlug = useMemo(() => {
    if (!courses || courses.length === 0) return null;
    return courses[0].slug;
  }, [courses]);

  // Fetch first course by slug to get full nested structure
  const { data: course, isLoading: courseLoading } = useQuery(
    courseBySlugOptions(firstCourseSlug || "")
  );

  // Find first lesson from any module in the course
  const lesson = useMemo(() => {
    if (!course?.modules || course.modules.length === 0) return null;

    // Find first module with lessons
    for (const courseModule of course.modules) {
      if (courseModule.lessons && courseModule.lessons.length > 0) {
        return courseModule.lessons[0];
      }
    }

    return null;
  }, [course]);

  // Fetch test cases
  const { data: testCases = [] } = useQuery({
    queryKey: ["testCases", lesson?.id],
    queryFn: () => fetchTestCases(lesson!.id),
    enabled: !!lesson?.id,
  });

  // Parse content for BlockNote
  const parsedContent = useMemo(() => {
    if (!lesson?.content) return null;
    try {
      return JSON.parse(lesson.content);
    } catch (e) {
      console.error("Invalid lesson content", e);
      return null;
    }
  }, [lesson]);

  const parsedInstructions = useMemo(() => {
    if (!lesson?.instructions) return null;
    try {
      return JSON.parse(lesson.instructions);
    } catch {
      // If it's not JSON, treat it as plain text
      return [
        {
          type: "paragraph",
          content: lesson.instructions,
        },
      ];
    }
  }, [lesson]);

  // BlockNote editor for content (read-only)
  const contentEditor = useCreateBlockNote({
    initialContent: parsedContent || [{ type: "paragraph" }],
    editable: false,
  });

  // BlockNote editor for instructions (read-only)
  const instructionsEditor = useCreateBlockNote({
    initialContent: parsedInstructions || [{ type: "paragraph" }],
    editable: false,
  });

  // Submission mutation
  const [lastSubmission, setLastSubmission] = useState<Submission | null>(null);

  const submitMutation = useMutation({
    mutationFn: submitCode,
    onSuccess: (data) => {
      setLastSubmission(data);
      queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
    },
  });

  const handleSubmit = async (code: string) => {
    if (!lesson) return;

    await submitMutation.mutateAsync({
      lessonId: lesson.id,
      code,
      language: lesson.language || "javascript",
    });
  };

  if (courseLoading || !courses) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p>
              No lesson found. Please create a course with modules and lessons
              first.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Lesson Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{lesson.name}</CardTitle>
        </CardHeader>
      </Card>

      {/* Lesson Content - BlockNote */}
      {lesson.content && parsedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Lesson Content</CardTitle>
          </CardHeader>
          <CardContent>
            <BlockNoteView editor={contentEditor} editable={false} />
          </CardContent>
        </Card>
      )}

      {/* Instructions - BlockNote */}
      {lesson.instructions && parsedInstructions && (
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <BlockNoteView editor={instructionsEditor} editable={false} />
          </CardContent>
        </Card>
      )}

      {/* Code Editor */}
      {lesson.startedCode ? (
        <CodeEditor
          initialCode={lesson.startedCode}
          language={lesson.language || "javascript"}
          testCases={testCases.map((tc) => ({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            isHidden: tc.isHidden,
          }))}
          onSubmit={handleSubmit}
          isSubmitting={submitMutation.isPending}
          lastSubmission={
            lastSubmission
              ? {
                  status: lastSubmission.status,
                  passedTests: lastSubmission.passedTests || 0,
                  totalTests: lastSubmission.totalTests || 0,
                  stdout: lastSubmission.stdout || undefined,
                  stderr: lastSubmission.stderr || undefined,
                }
              : undefined
          }
        />
      ) : (
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500">
              No starter code available for this lesson.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LearnPage;
