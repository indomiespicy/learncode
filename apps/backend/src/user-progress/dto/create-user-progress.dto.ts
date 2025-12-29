import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateUserProgressDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  @IsNotEmpty()
  @IsUUID()
  currentLessonId: string;

  @IsOptional()
  @IsNumber()
  percentage?: number;
}
