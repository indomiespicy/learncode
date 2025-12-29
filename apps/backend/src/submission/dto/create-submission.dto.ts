import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { SubmissionStatus } from 'generated/prisma/enums';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50000)
  code: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;

  @IsOptional()
  @IsNumber()
  passedTests?: number;

  @IsOptional()
  @IsNumber()
  totalTests?: number;

  @IsOptional()
  @IsString()
  stdout?: string;

  @IsOptional()
  @IsString()
  stderr?: string;

  @IsOptional()
  @IsString()
  compiledOutput?: string;

  @IsOptional()
  @IsNumber()
  time?: number;

  @IsOptional()
  @IsNumber()
  memory?: number;

  @IsUUID()
  @IsNotEmpty()
  lessonId: string;
}
