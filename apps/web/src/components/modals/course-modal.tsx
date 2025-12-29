"use client";

import { CourseForm } from "@/components/forms/course-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useCourseModal } from "@/hooks/use-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseFormSchema } from "@/lib/zod-schema";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export const CourseModal = () => {
  const { isOpen, onClose, course } = useCourseModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createCourseMutation = useMutation({
    mutationFn: (data: z.infer<typeof courseFormSchema>) => {
      return api("/courses", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course created successfully!");
      router.push("/admin/courses");
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: (data: z.infer<typeof courseFormSchema>) => {
      return api(`/courses/${course!.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Course updated successfully!");
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (data: z.infer<typeof courseFormSchema>) => {
    if (!course) {
      createCourseMutation.mutate(data);
    } else {
      updateCourseMutation.mutate(data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {course ? "Edit course" : "Create new course"}
          </DialogTitle>
          <DialogDescription>
            {` Fill this form below to ${!course ? "create a new" : "edit"} course`}
          </DialogDescription>
        </DialogHeader>
        <CourseForm course={course} onSubmit={handleSubmit} />
        <DialogFooter>
          <Button
            type="submit"
            form="course-form"
            disabled={
              createCourseMutation.isPending || updateCourseMutation.isPending
            }
          >
            {createCourseMutation.isPending ||
            updateCourseMutation.isPending ? (
              course ? (
                <>
                  <Loader2 className="animate-spin" />
                  Sedang meng-update
                </>
              ) : (
                <>
                  <Loader2 className="animate-spin" />
                  Sedang membuat
                </>
              )
            ) : course ? (
              "Edit kursus"
            ) : (
              "Buat kursus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
