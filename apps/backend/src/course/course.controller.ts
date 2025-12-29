import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseService } from './course.service';
import { AllowAnonymous, Roles, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // TODO: add course filter for difficulty and category

  // GET PUBLIC /courses
  @Get()
  @AllowAnonymous()
  findAll() {
    return this.courseService.findAll();
  }

  // GET  PUBLIC /courses/:slug
  @Get(':slug')
  @AllowAnonymous()
  findOne(@Param('slug') slug: string) {
    return this.courseService.findOne(slug);
  }

  // POST admin /courses
  @Post()
  @Roles(['admin'])
  create(@Body() data: CreateCourseDto) {
    return this.courseService.create(data);
  }

  // PATCH  admin /courses/:id
  @Patch(':id')
  @Roles(['admin'])
  update(@Param(`id`) id: string, @Body() data: UpdateCourseDto) {
    return this.courseService.update(id, data);
  }

  // DELETE admin /course/:id
  @Delete(':id')
  @Roles(['admin'])
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
