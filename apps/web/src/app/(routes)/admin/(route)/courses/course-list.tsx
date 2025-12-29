import { CourseCard } from "@/components/cards/course-card";

import { CourseWithModulesCount } from "@/lib/types";

export const CourseList = ({
  courses,
}: {
  courses: CourseWithModulesCount[];
}) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {courses?.map((item) => (
        <CourseCard key={item.id} course={item} />
      ))}
    </div>
  );
};
