"use client";

import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { lessonFormSchema } from "@/lib/zod-schema";
import { useLessonModal } from "@/hooks/use-modal";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { CreateLessonForm } from "../forms/create-lesson-form";
import { Loader2 } from "lucide-react";

export const LessonModal = () => {
  const { lesson, isOpen, onClose, module } = useLessonModal();
  const queryClient = useQueryClient();
  const createLessonMutation = useMutation({
    mutationFn: (data: z.infer<typeof lessonFormSchema>) => {
      return api("/lessons", {
        method: "POST",
        body: JSON.stringify({ ...data, moduleId: module!.id }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Berhasil membuat pelajaran baru");
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
      onClose();
    },
  });

  const handleSubmit = (data: z.infer<typeof lessonFormSchema>) => {
    if (lesson) {
      updateLessonMutation.mutate(data);
    } else {
      createLessonMutation.mutate(data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {lesson ? "Edit Pelajaran" : "Buat pelajaran baru"}
          </DialogTitle>
          <DialogDescription>
            {`Isi form berikut untuk ${lesson ? "mengedit pelajaran" : "membuat pelajaran baru"}`}
          </DialogDescription>
        </DialogHeader>

        <CreateLessonForm lesson={lesson} onSubmit={handleSubmit} />
        <DialogFooter>
          <Button
            type="submit"
            form="lesson-form"
            disabled={
              createLessonMutation.isPending || updateLessonMutation.isPending
            }
          >
            {createLessonMutation.isPending ||
            updateLessonMutation.isPending ? (
              lesson ? (
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
            ) : lesson ? (
              "Edit pelajaran"
            ) : (
              "Buat pelajaran"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
