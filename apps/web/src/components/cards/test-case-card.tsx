import { Edit, Eye, EyeOff } from "lucide-react";
import { TestCase, Lesson } from "../../../../backend/generated/prisma/client";
import { DeleteButton } from "../buttons/delete-button";
import { Card, CardContent } from "../ui/card";
import { useConfirm } from "@/hooks/use-confirm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useTestCaseModal } from "@/hooks/use-modal";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const TestCaseCard = ({
  testCase,
  lesson,
}: {
  testCase: TestCase;
  lesson: Lesson;
}) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Hapus Test Case",
    "Apakah anda yakin akan menghapus test case?"
  );
  const queryClient = useQueryClient();
  const { onOpen } = useTestCaseModal();

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
                  <Badge variant="secondary" className="gap-1">
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
                    deleteTestCaseMutation.mutate(testCase.id);
                  }
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
