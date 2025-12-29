"use client";

import { CourseEditCard } from "@/components/cards/course-edit-card";
import { ModuleCard } from "@/components/cards/module-card";
import { LayoutTitle } from "@/components/layout/title";

import { courseBySlugOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const EditCoursePage = () => {
  const params = useParams();
  const slug = params.slug;

  const {
    data: course,
    isPending,
    error,
  } = useQuery(courseBySlugOptions(slug as string));

  if (!slug || typeof slug !== "string") {
    return <div>Invalid course slug</div>;
  }
  if (!course) return;
  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }
  if (isPending) return <div>Loading</div>;

  const { modules } = course;

  return (
    <div className="space-y-5">
      <LayoutTitle
        title="Edit kursus"
        description="Atur modul dan pelajaran melalui form dibawah ini"
      />
      {/* course card */}
      <CourseEditCard course={course} />
      {/* module card */}
      {modules.map((item) => (
        <ModuleCard course={course} key={item.id} module={item} />
      ))}
    </div>
  );
};

export default EditCoursePage;
