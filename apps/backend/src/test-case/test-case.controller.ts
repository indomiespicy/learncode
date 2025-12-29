import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TestCaseService } from './test-case.service';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { Roles } from '@thallesp/nestjs-better-auth';

@Controller('test-cases')
export class TestCaseController {
  constructor(private readonly testCaseService: TestCaseService) {}

  // GET auth /test-cases
  @Get()
  findAll() {
    return this.testCaseService.findAll();
  }

  // GET auth /test-cases/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testCaseService.findOne(id);
  }

  // GET auth /test-cases/lesson/:lessonId
  @Get('/lesson/:lessonId')
  findByLesson(@Param('lessonId') lessonId: string) {
    return this.testCaseService.findByLesson(lessonId);
  }

  // POST admin /test-cases
  @Post()
  @Roles(['admin'])
  create(@Body() data: CreateTestCaseDto) {
    return this.testCaseService.create(data);
  }

  // PATCH admin /test-cases/:id
  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() data: UpdateTestCaseDto) {
    return this.testCaseService.update(id, data);
  }

  // DELETE admin /test-cases/:id
  @Delete(':id')
  @Roles(['admin'])
  delete(@Param('id') id: string) {
    return this.testCaseService.delete(id);
  }
}
