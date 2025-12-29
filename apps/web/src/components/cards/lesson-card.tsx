import { Code2, Edit, Eye, EyeOff, GripVertical, Plus } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lesson, TestCase } from "../../lib/types";
import { DeleteButton } from "../buttons/delete-button";
import { UpdateButton } from "../buttons/update-button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useState } from "react";
import { LessonForm } from "../forms/lesson-form";
import { Button } from "../ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import z from "zod";
import { lessonFormSchema } from "@/lib/zod-schema";
import { useTestCaseModal } from "@/hooks/use-modal";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

export const LessonCard = ({
  lesson,
}: {
  lesson: Lesson & { testCases: TestCase[] };
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [ConfirmDialog, confirm] = useConfirm(
    "Hapus Pelajaran",
    "Apakah anda yakin akan menghapus pelajaran?"
  );
  const queryClient = useQueryClient();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lesson.id });
  const { onOpen } = useTestCaseModal();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const updateLessonMutation = useMutation({
    mutationFn: (data: z.infer<typeof lessonFormSchema>) => {
      return api(`/lessons/${lesson!.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Pelajaran berhasil diupdate");
      setEdit(false);
    },
  });
  const deleteLessonMutation = useMutation({
    mutationFn: (id: string) => {
      return api(`/lessons/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Berhasil menghapus pelajaran");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteTestCaseMutation = useMutation({
    mutationFn: (id: string) => {
      return api(`/test-cases/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Berhasil menghapus test case");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <ConfirmDialog />
      <div ref={setNodeRef} style={style}>
        <Card className="relative">
          {!edit && (
            <div
              {...attributes}
              {...listeners}
              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-2"
            >
              <GripVertical className="h-5 w-5" />
            </div>
          )}
          <CardHeader className="pl-12">
            <CardTitle>
              {edit ? `Edit ${lesson.name}` : `${lesson.name}`}
            </CardTitle>
            {edit && (
              <CardDescription>Isi form berikut dibawah ini</CardDescription>
            )}
            <CardAction className="space-x-2">
              <UpdateButton handleUpdate={() => setEdit(!edit)} />
              <DeleteButton
                handleDelete={async () => {
                  const ok = await confirm();
                  if (ok) {
                    deleteLessonMutation.mutate(lesson.id);
                  }
                }}
              />
            </CardAction>
          </CardHeader>
          {edit && (
            <CardContent className="space-y-5">
              <LessonForm
                lesson={lesson}
                onSubmit={(data) => updateLessonMutation.mutate(data)}
              />

              {lesson && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold">Test Cases</h3>
                      {lesson.testCases && lesson.testCases.length > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {lesson.testCases.length}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {lesson.testCases && lesson.testCases.length > 0 ? (
                    <div className="space-y-3">
                      {lesson.testCases.map((testCase) => (
                        <Card
                          key={testCase.id}
                          className="border-2 hover:border-primary/50 transition-colors"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-sm">
                                    Test Case #{testCase.order}
                                  </span>
                                  {testCase.isHidden && (
                                    <Badge variant="outline" className="gap-1">
                                      <EyeOff className="h-3 w-3" />
                                      Hidden
                                    </Badge>
                                  )}
                                  {!testCase.isHidden && (
                                    <Badge
                                      variant="secondary"
                                      className="gap-1"
                                    >
                                      <Eye className="h-3 w-3" />
                                      Visible
                                    </Badge>
                                  )}
                                </div>

                                <div className="space-y-1.5 text-sm">
                                  <div>
                                    <span className="font-medium text-muted-foreground">
                                      Input:
                                    </span>
                                    <pre className="mt-1 p-2 bg-muted rounded-md text-xs font-mono overflow-x-auto">
                                      {testCase.input.length > 100
                                        ? `${testCase.input.substring(0, 100)}...`
                                        : testCase.input}
                                    </pre>
                                  </div>
                                  <div>
                                    <span className="font-medium text-muted-foreground">
                                      Expected Output:
                                    </span>
                                    <pre className="mt-1 p-2 bg-muted rounded-md text-xs font-mono overflow-x-auto">
                                      {testCase.expectedOutput.length > 100
                                        ? `${testCase.expectedOutput.substring(0, 100)}...`
                                        : testCase.expectedOutput}
                                    </pre>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onOpen(lesson, testCase)}
                                  className="gap-2"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </Button>
                                <DeleteButton
                                  handleDelete={async () => {
                                    const ok = await confirm();
                                    if (ok) {
                                      deleteTestCaseMutation.mutate(
                                        testCase.id
                                      );
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                      <Code2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No test cases yet</p>
                      <p className="text-xs mt-1">
                        Add your first test case to get started
                      </p>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    onClick={() => onOpen(lesson)}
                    className="w-full gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Test Case
                  </Button>
                </div>
              )}
              <Button type="submit" form="lesson-form">
                Buat Pelajaran
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};
