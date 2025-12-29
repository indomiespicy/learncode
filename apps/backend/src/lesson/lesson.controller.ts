import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AllowAnonymous, Roles } from '@thallesp/nestjs-better-auth';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  // GET public /lessons
  @Get()
  @AllowAnonymous()
  findAll() {
    return this.lessonService.findAll();
  }

  // GET public /lessons/:slug?:moduleId
  @Get(':slug')
  @AllowAnonymous()
  findOne(@Param('slug') slug: string, @Query('moduleId') moduleId: string) {
    return this.lessonService.findOne(slug, moduleId);
  }

  // POST admin /lessons
  @Post()
  @Roles(['admin'])
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  // PATCH admin  /lessons/:id
  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(id, updateLessonDto);
  }

  // DELETE admin /lessons/:id
  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
