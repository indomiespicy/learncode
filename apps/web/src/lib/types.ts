// TODO: make the types shared package and use docker to deploy!~
export const Difficulty = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export const CourseCategory = {
  WEB_DEVELOPMENT: "WEB_DEVELOPMENT",
  PROGRAMMING_LANGUAGE: "PROGRAMMING_LANGUAGE",
  DATA_SCIENCE: "DATA_SCIENCE",
  MOBILE_DEVELOPMENT: "MOBILE_DEVELOPMENT",
  DEVOPS: "DEVOPS",
} as const;

export type CourseCategory =
  (typeof CourseCategory)[keyof typeof CourseCategory];

export const SubmissionStatus = {
  PENDING: "PENDING",
  RUNNING: "RUNNING",
  ACCEPTED: "ACCEPTED",
  WRONG_ANSWER: "WRONG_ANSWER",
  TIME_LIMIT_EXCEEDED: "TIME_LIMIT_EXCEEDED",
  MEMORY_LIMIT_EXCEEDED: "MEMORY_LIMIT_EXCEEDED",
  RUNTIME_ERROR: "RUNTIME_ERROR",
  COMPILE_ERROR: "COMPILE_ERROR",
} as const;

export type SubmissionStatus =
  (typeof SubmissionStatus)[keyof typeof SubmissionStatus];

// Local Prisma client types (mirroring backend schema)
export type Course = {
  id: string;
  name: string;
  slug: string;
  about: string;
  order: number;
  difficulty: Difficulty;
  category: CourseCategory;
  createdAt: Date;
  updatedAt: Date;
};

export type Module = {
  id: string;
  name: string;
  slug: string;
  order: number;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  lessons?: (Lesson & { testCases: TestCase[] })[]; // Optional for basic module type
};

export type Lesson = {
  id: string;
  name: string;
  slug: string;
  content: string | null;
  order: number | null;
  instructions: string | null;
  startedCode: string | null;
  solution: string | null;
  language: string | null;
  moduleId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TestCase = {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  order: number;
  lessonId: string;
};

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

// Extended types for API responses
export type ModuleWithLessons = Module & {
  lessons: (Lesson & {
    testCases: TestCase[];
  })[];
};

// Local auth type definition (mirroring backend configuration)
export type LocalAuth = {
  user: {
    additionalFields: {
      role: {
        type: "string";
        required: false;
        defaultValue: "user";
      };
    };
  };
};
