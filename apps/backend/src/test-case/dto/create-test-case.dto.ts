import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTestCaseDto {
  @IsOptional()
  @IsString()
  input: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  expectedOutput: string;

  @IsOptional()
  @IsBoolean()
  isHidden?: boolean;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsNotEmpty()
  @IsUUID()
  lessonId: string;
}
