import {
  Course,
  Lesson,
  Module,
  TestCase,
} from "../../../backend/generated/prisma/client";

// course for course card on dashboard
export type CourseWithModulesCount = Course & {
  _count: {
    modules: number;
  };
};

// course for course detail
export type CourseWithModulesAndLessons = Course & {
  modules: (Module & {
    lessons: (Lesson & {
      testCases: TestCase[];
    })[];
  })[];
};
