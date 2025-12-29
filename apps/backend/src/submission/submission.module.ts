import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { PrismaService } from 'src/prisma.service';
import { Judge0Module } from '../judge0/judge0.module';
import { TestCaseModule } from '../test-case/test-case.module';

@Module({
  imports: [Judge0Module, TestCaseModule],
  controllers: [SubmissionController],
  providers: [SubmissionService, PrismaService],
})
export class SubmissionModule {}
