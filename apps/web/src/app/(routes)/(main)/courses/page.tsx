"use client";

import { useQuery } from "@tanstack/react-query";
import { coursesOptions } from "@/lib/api";
import { PublicCourseCard } from "@/components/cards/public-course-card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

const CoursesPage = () => {
  const { data: courses, isLoading, error } = useQuery(coursesOptions);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="mb-8 space-y-2">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4 rounded-xl border p-6">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
          <p className="text-destructive">
            Gagal memuat kursus. Silakan coba lagi nanti.
          </p>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-16">
        <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">
          <BookOpen className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Belum ada kursus</h2>
          <p className="text-muted-foreground">
            Kursus akan segera tersedia. Silakan kembali lagi nanti.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Semua Kursus
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Pilih kursus yang ingin kamu pelajari. Setiap kursus terdiri dari
          beberapa modul dengan lesson yang terstruktur.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <PublicCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
