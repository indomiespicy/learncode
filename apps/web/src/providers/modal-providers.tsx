import { CourseModal } from "@/components/modals/course-modal";
import { LessonModal } from "@/components/modals/lesson-modal";
import { ModuleModal } from "@/components/modals/module-modal";
import { TestCaseModal } from "@/components/modals/test-case-modal";

export const ModalProviders = () => {
  return (
    <>
      <CourseModal />
      <ModuleModal />
      <LessonModal />
      <TestCaseModal />
    </>
  );
};
