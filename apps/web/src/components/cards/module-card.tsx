import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useMemo, useEffect } from "react";
import { Edit, PlusSquare } from "lucide-react";
import {
  Course,
  Lesson,
  Module,
  TestCase,
} from "../../lib/types";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { DeleteButton } from "../buttons/delete-button";
import { useLessonModal, useModuleModal } from "@/hooks/use-modal";
import { LessonCard } from "./lesson-card";
import { useConfirm } from "@/hooks/use-confirm";

export const ModuleCard = ({
  module,
  course,
}: {
  module: Module & { lessons: (Lesson & { testCases: TestCase[] })[] };
  course: Course;
}) => {
  const { onOpen } = useLessonModal();
  const { onOpen: onOpenModule } = useModuleModal();
  const queryClient = useQueryClient();
  const [ConfirmDialog, confirm] = useConfirm(
    "Hapus Module",
    "Apakah anda yakin akan menghapus module??"
  );

  // initialize sorted lessons with useMemo to avoid effect
  const initialSortedLessons = useMemo(() => {
    return [...module.lessons].sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      return orderA - orderB;
    });
  }, [module.lessons]);

  const [orderedLessons, setOrderedLessons] =
    useState<(Lesson & { testCases: TestCase[] })[]>(initialSortedLessons);

  // Replace the problematic sync logic with useEffect
  useEffect(() => {
    setOrderedLessons(initialSortedLessons);
  }, [initialSortedLessons]);

  const deleteModuleMutation = useMutation({
    mutationFn: (id: string) => {
      return api(`/modules/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Modul berhasil dihapus");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateLessonOrderMutation = useMutation({
    mutationFn: async (lessons: { id: string; order: number }[]) => {
      return Promise.all(
        lessons.map((lesson) =>
          api(`/lessons/${lesson.id}`, {
            method: "PATCH",
            body: JSON.stringify({ order: lesson.order }),
          })
        )
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Urutan pelajaran berhasil diupdate");
    },
    onError: () => {
      // revert to original order on error
      setOrderedLessons(initialSortedLessons);
      toast.error("Gagal mengupdate urutan pelajaran");
    },
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrderedLessons((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);

      // update backend with new positions
      const lessonsWithNewOrder = newOrder.map((lesson, index) => ({
        id: lesson.id,
        order: index + 1,
      }));
      updateLessonOrderMutation.mutate(lessonsWithNewOrder);

      return newOrder;
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Card key={module.id}>
        <CardHeader>
          <CardTitle>{module.name}</CardTitle>
          <CardAction className="space-x-2">
            <Button
              onClick={() => onOpenModule(course, module)}
              variant="outline"
            >
              <Edit />
            </Button>
            <DeleteButton
              handleDelete={async () => {
                const ok = await confirm();
                if (ok) {
                  deleteModuleMutation.mutate(module.id);
                }
              }}
              isPending={deleteModuleMutation.isPending}
            />
            <Button onClick={() => onOpen(module)}>
              <PlusSquare />
              Tambah Pelajaran
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderedLessons.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              {orderedLessons.map((item) => (
                <LessonCard key={item.id} lesson={item} />
              ))}
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>
    </>
  );
};
