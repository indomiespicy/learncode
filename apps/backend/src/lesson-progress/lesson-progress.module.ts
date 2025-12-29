import { Module } from '@nestjs/common';
import { LessonController } from 'src/lesson/lesson.controller';
import { LessonService } from 'src/lesson/lesson.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LessonController],
  providers: [LessonService, PrismaService],
})
export class LessonProgressModule {}
