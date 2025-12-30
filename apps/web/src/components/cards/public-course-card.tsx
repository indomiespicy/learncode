"use client";

import { BookCopyIcon, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { CourseWithModulesCount } from "@/lib/types";
import { Badge } from "../ui/badge";

export const PublicCourseCard = ({
  course,
}: {
  course: CourseWithModulesCount;
}) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="line-clamp-2">{course.name}</CardTitle>
        <CardAction>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="text-xs">
              {course.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <BookCopyIcon className="size-3" />
              <span>{course._count.modules} Module</span>
            </div>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {course.about}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="default"
          className="w-full group-hover:bg-primary/90"
        >
          <Link href={`/courses/${course.slug}`}>
            Lihat Kursus
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
