"use client";

import { useQuery } from "@tanstack/react-query";
import { courseBySlugOptions } from "@/lib/api";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, BookOpen, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const {
    data: course,
    isLoading,
    error,
  } = useQuery(courseBySlugOptions(slug));

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-16">
        <Skeleton className="mb-6 h-10 w-48" />
        <Skeleton className="mb-4 h-8 w-3/4" />
        <Skeleton className="mb-8 h-4 w-full" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-16">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
          <p className="text-destructive mb-4">
            Kursus tidak ditemukan atau gagal dimuat.
          </p>
          <Button asChild variant="outline">
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Daftar Kursus
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16">
      {/* Back Button */}
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/courses">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Link>
      </Button>

      {/* Course Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline">{course.difficulty}</Badge>
          <Badge variant="secondary">{course.category}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {course.name}
        </h1>
        <p className="text-lg text-muted-foreground">{course.about}</p>
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Modul Kursus</h2>
        {course.modules && course.modules.length > 0 ? (
          <div className="space-y-3">
            {course.modules.map((module, index) => (
              <Card
                key={module.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {index + 1}
                        </span>
                        {module.name}
                      </CardTitle>
                      {module.lessons && module.lessons.length > 0 && (
                        <CardDescription className="mt-2">
                          {module.lessons.length} Lesson
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {module.lessons && module.lessons.length > 0 && (
                  <CardContent>
                    <div className="space-y-2">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-2 rounded-md border p-2 text-sm"
                        >
                          <PlayCircle className="h-4 w-4 text-muted-foreground" />
                          <span>{lesson.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <BookOpen className="mx-auto mb-2 h-8 w-8" />
              <p>Belum ada modul untuk kursus ini.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* CTA Button */}
      {course.modules && course.modules.length > 0 && (
        <div className="mt-8">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href={`/learn?course=${course.slug}`}>
              Mulai Belajar
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
