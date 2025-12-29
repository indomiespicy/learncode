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
import { testCaseFormSchema } from "@/lib/zod-schema";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { TestCaseForm } from "../forms/test-case-form";
import { Loader2 } from "lucide-react";
import { useTestCaseModal } from "@/hooks/use-modal";

export const TestCaseModal = () => {
  const queryClient = useQueryClient();
  const { lesson, isOpen, onClose, testCase } = useTestCaseModal();

  const createTestCaseMutation = useMutation({
    mutationFn: (data: z.infer<typeof testCaseFormSchema>) => {
      return api("/test-cases", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          lessonId: lesson!.id,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Berhasil membuat test case baru");
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateTestCaseMutation = useMutation({
    mutationFn: (data: z.infer<typeof testCaseFormSchema>) => {
      return api(`/test-cases/${testCase!.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Test case berhasil diupdate");
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (data: z.infer<typeof testCaseFormSchema>) => {
    if (testCase) {
      updateTestCaseMutation.mutate(data);
    } else {
      createTestCaseMutation.mutate(data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {testCase ? "Edit Test Case" : "Buat Test Case Baru"}
          </DialogTitle>
          <DialogDescription>
            {`Isi form berikut untuk ${testCase ? "mengedit test case" : "membuat test case baru"}`}
          </DialogDescription>
        </DialogHeader>

        <TestCaseForm testCase={testCase} onSubmit={handleSubmit} />

        <DialogFooter>
          <Button
            type="submit"
            form="test-case-form"
            disabled={
              createTestCaseMutation.isPending ||
              updateTestCaseMutation.isPending
            }
          >
            {createTestCaseMutation.isPending ||
            updateTestCaseMutation.isPending ? (
              testCase ? (
                <>
                  <Loader2 className="animate-spin" />
                  Sedang meng-update
                </>
              ) : (
                <>
                  <Loader2 className="animate-spin" />
                  Sedang membuat...
                </>
              )
            ) : testCase ? (
              "Update Test Case"
            ) : (
              "Buat Test Case"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
