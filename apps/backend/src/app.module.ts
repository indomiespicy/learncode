import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from './auth';
import { CourseModule } from './course/course.module';
import { ModuleModule } from './module/module.module';
import { TestCaseModule } from './test-case/test-case.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { LessonProgressModule } from './lesson-progress/lesson-progress.module';
import { SubmissionModule } from './submission/submission.module';
import { Judge0Module } from './judge0/judge0.module';

@Module({
  imports: [
    AuthModule.forRoot({ auth }),
    CourseModule,
    ModuleModule,
    TestCaseModule,
    UserProgressModule,
    LessonProgressModule,
    SubmissionModule,
    Judge0Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
