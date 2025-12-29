"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useCourseModal } from "@/hooks/use-modal";

//TODO: add dynamic action button
export const NewCourseButton = () => {
  const { onOpen } = useCourseModal();
  return (
    <Button onClick={() => onOpen()}>
      <PlusCircle className="size-4 ml-1" />
      Add new course
    </Button>
  );
};
