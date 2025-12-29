import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LessonProgressService } from './lesson-progress.service';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('lesson-progresses')
export class LessonProgressController {
  constructor(private readonly lessonProgressService: LessonProgressService) {}

  //   GET auth /
  @Get()
  findAll() {
    return this.lessonProgressService.findAll();
  }
  // GET /me

  @Get('me')
  getMyLessonProgress(
    @Session() session: UserSession,
    @Query() lessonId?: string,
  ) {
    if (lessonId) {
      return this.lessonProgressService.findByLessonId(
        session.user.id,
        lessonId,
      );
    }
    return this.lessonProgressService.findAllByUserId(session.user.id);
  }

  // GET /:id
  @Get(':id')
  findOne(@Param('id') id) {
    return this.lessonProgressService.findOne(id);
  }

  // POST /
  @Post()
  create(@Body() lessonProgressDto) {
    return this.lessonProgressService.create(lessonProgressDto);
  }

  // PATCH /:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonProgressDto) {
    return this.lessonProgressService.update(id, updateLessonProgressDto);
  }
  // DELETE /:id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.lessonProgressService.delete(id);
  }
}
