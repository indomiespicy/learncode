import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { LessonStatus } from 'generated/prisma/enums';

export class CreateLessonProgressDto {
  @IsOptional()
  @IsEnum([LessonStatus])
  lessonStatus?: LessonStatus;

  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  lessonId: string;
}
