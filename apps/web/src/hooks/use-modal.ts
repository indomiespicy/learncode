import { create } from "zustand";
import {
  Course,
  Lesson,
  Module,
  TestCase,
} from "../../../backend/generated/prisma/client";

interface createState {
  isOpen: boolean;
  onOpen: (course?: Course, module?: Module) => void;
  onClose: () => void;
  course: Course | undefined;
  module: Module | undefined;
}

interface lessonModalState {
  isOpen: boolean;
  onOpen: (module?: Module, lesson?: Lesson) => void;
  onClose: () => void;
  lesson: Lesson | undefined;
  module: Module | undefined;
}

interface testCaseModalState {
  isOpen: boolean;
  onOpen: (lesson?: Lesson, testCase?: TestCase) => void;
  onClose: () => void;
  lesson: Lesson | undefined;
  testCase: TestCase | undefined;
}

export const useCourseModal = create<createState>((set) => ({
  isOpen: false,
  course: undefined,
  module: undefined,
  onOpen: (course) => set({ isOpen: true, course }),
  onClose: () => set({ isOpen: false, course: undefined }),
}));

export const useModuleModal = create<createState>((set) => ({
  isOpen: false,
  course: undefined,
  module: undefined,
  onOpen: (course, module) => set({ isOpen: true, course, module }),
  onClose: () => set({ isOpen: false, course: undefined, module: undefined }),
}));

export const useLessonModal = create<lessonModalState>((set) => ({
  isOpen: false,
  lesson: undefined,
  module: undefined,
  onOpen: (module, lesson) => set({ isOpen: true, module, lesson }),
  onClose: () => set({ isOpen: false, lesson: undefined, module: undefined }),
}));

export const useTestCaseModal = create<testCaseModalState>((set) => ({
  testCase: undefined,
  isOpen: false,
  lesson: undefined,
  onOpen: (lesson, testCase) => set({ isOpen: true, lesson, testCase }),
  onClose: () => set({ isOpen: false, lesson: undefined, testCase: undefined }),
}));
