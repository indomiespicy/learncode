"use client";

import { useModuleModal } from "@/hooks/use-modal";
import { ModuleForm } from "../forms/module-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { moduleFormSchema } from "@/lib/zod-schema";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const ModuleModal = () => {
  const { isOpen, onClose, course, module } = useModuleModal();
  const queryClient = useQueryClient();

  const createModuleMutation = useMutation({
    mutationFn: (data: z.infer<typeof moduleFormSchema>) => {
      return api("/modules", {
        method: "POST",
        body: JSON.stringify({
          courseId: course?.id,
          ...data,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      if (!course) return null;
      toast.success("Modul berhasil dibuat!");
      onClose();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateModuleMutation = useMutation({
    mutationFn: (data: z.infer<typeof moduleFormSchema>) => {
      return api(`/modules/${module!.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Modul berhasil di-update!");
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (data: z.infer<typeof moduleFormSchema>) => {
    if (module) {
      updateModuleMutation.mutate(data);
    } else {
      createModuleMutation.mutate(data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {module ? "Edit module" : "Buat modul baru"}
          </DialogTitle>
          <DialogDescription>
            {` Isi form dibawah ini untuk ${module ? "mengubah module" : "buat module baru"}`}
          </DialogDescription>
        </DialogHeader>
        <ModuleForm module={module} onSubmit={handleSubmit} />
        <DialogFooter className="mt-10">
          <Button onClick={() => onClose()} variant="outline">
            Batal
          </Button>
          <Button
            type="submit"
            form="module-form"
            disabled={
              createModuleMutation.isPending || updateModuleMutation.isPending
            }
          >
            {createModuleMutation.isPending ||
            updateModuleMutation.isPending ? (
              module ? (
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
            ) : module ? (
              "Edit Module"
            ) : (
              "Buat Module"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
