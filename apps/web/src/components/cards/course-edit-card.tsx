import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModuleModal } from "@/hooks/use-modal";
import { PlusCircleIcon } from "lucide-react";
import { Course } from "../../../../backend/generated/prisma/client";

export const CourseEditCard = ({ course }: { course: Course }) => {
  const { onOpen: onOpenModule } = useModuleModal();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.about}</CardDescription>
        <CardAction className="space-x-2">
          <Button onClick={() => onOpenModule(course)}>
            <PlusCircleIcon className="ml-1" />
            Tambah Modul
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-start">
          <Badge>{course.category}</Badge>
          <Badge>{course.difficulty}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
