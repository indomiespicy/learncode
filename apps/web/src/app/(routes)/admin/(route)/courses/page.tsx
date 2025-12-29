"use client";

import { NewCourseButton } from "@/components/layout/new-course-button";
import { LayoutTitle } from "@/components/layout/title";
import { coursesOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CourseCard } from "@/components/cards/course-card";

const LearningPage = () => {
  const { data: courses } = useQuery(coursesOptions);
  if (!courses) return;
  return (
    <div className="space-y-5">
      <LayoutTitle
        title="Manage courses"
        description="Create, edit, and organize all courses"
      >
        <NewCourseButton />
      </LayoutTitle>
      <div className="grid grid-cols-3 gap-6">
        {courses?.map((item) => (
          <CourseCard key={item.id} course={item} />
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
