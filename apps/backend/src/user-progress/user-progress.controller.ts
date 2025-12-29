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
import { UserProgressService } from './user-progress.service';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';
import { Roles, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('user-progresses')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  // GET all admin /user-progresses
  @Get()
  @Roles(['admin'])
  async findAll() {
    return this.userProgressService.findAll();
  }

  // GET me auth /user-progresses/me
  @Get('me')
  getMyProgress(
    @Session() session: UserSession,
    @Query('courseId') courseId?: string,
  ) {
    if (!courseId) {
      return this.userProgressService.findAllByUserId(session.user.id);
    }
    return this.userProgressService.findByCourseId(session.user.id, courseId);
  }

  // GET compound route admin /user-progress/user/:userId/course/:courseId
  @Get('user/:userId/course/:courseId')
  @Roles(['admin'])
  findByUserAndCourse(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.userProgressService.findByCourseId(userId, courseId);
  }

  // GET single param admin /user-progresses/user/:userId
  @Get('/user/:userId')
  @Roles(['admin'])
  findAllByUser(@Param('userId') userId: string) {
    return this.userProgressService.findAllByUserId(userId);
  }

  // GET admin /user-progresses/:id
  @Get(':id')
  @Roles(['admin'])
  findOne(@Param('id') id: string) {
    return this.userProgressService.findOne(id);
  }

  // POST admin /user-progresses
  @Post()
  @Roles(['admin'])
  create(@Body() createUserProgressDto: CreateUserProgressDto) {
    return this.userProgressService.create(createUserProgressDto);
  }

  // PATCH admin /user-progresses/:id
  @Patch(':id')
  @Roles(['admin'])
  update(
    @Body() updateUserProgressDto: UpdateUserProgressDto,
    @Param('id') id: string,
  ) {
    return this.userProgressService.update(id, updateUserProgressDto);
  }

  // DELETE admin /user-progresses/:id
  @Delete(':id')
  @Roles(['admin'])
  delete(@Param('id') id: string) {
    return this.userProgressService.delete(id);
  }
}
