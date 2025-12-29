import { BookCopyIcon, Clock2, Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter } from "next/navigation";
import { DeleteButton } from "../buttons/delete-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { CourseWithModulesCount } from "@/lib/types";
import { useCourseModal } from "@/hooks/use-modal";

export const CourseCard = ({ course }: { course: CourseWithModulesCount }) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Hapus Kursus",
    "Apakah anda yakin akan menghapus kursus?"
  );
  const router = useRouter();
  const queryClient = useQueryClient();
  const { onOpen } = useCourseModal();

  const deleteCourseMutation = useMutation({
    mutationFn: (id: string) => {
      return api(`/courses/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course berhasil dihapus");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <>
      <ConfirmDialog />
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{course.name}</CardTitle>
          <CardAction>
            <div className="flex gap-4 ">
              <div className="flex  items-center justify-center">
                <Clock2 className="size-3 mr-1" />
                {/* TODO: make an estimated hours */}
                <p className="text-sm">0 Hours</p>
              </div>
              <div className="flex items-center justify-center">
                <BookCopyIcon className="size-3 mr-1" />
                <p className="text-sm">{course._count.modules} Module</p>
              </div>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{course.about}</p>
        </CardContent>
        <CardFooter className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/courses/${course.slug}`)}
            className="flex-1"
          >
            Lihat Kursus
          </Button>
          <Button variant="outline" onClick={() => onOpen(course)}>
            <Edit className="size-4" />
          </Button>
          <DeleteButton
            isPending={deleteCourseMutation.isPending}
            handleDelete={async () => {
              const ok = await confirm();
              if (ok) {
                deleteCourseMutation.mutate(course.id);
              }
            }}
          />
        </CardFooter>
      </Card>
    </>
  );
};
