import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase letters, numbers, and hyphens only',
  })
  slug: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1000)
  instructions: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1000)
  startedCode: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(1000)
  solution: string;

  @IsUUID()
  @IsOptional()
  moduleId: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}
