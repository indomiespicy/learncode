import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Roles, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('submission-progresses')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  // GET all admin /
  @Get()
  @Roles(['admin'])
  findAll() {
    return this.submissionService.findAll();
  }

  // GET auth /:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionService.findOne(id);
  }

  // POST auth /
  @Post()
  create(
    @Session() session: UserSession,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ) {
    return this.submissionService.create(session.user.id, createSubmissionDto);
  }

  // PATCH auth /:id
  @Patch(':id')
  update(
    @Session() session: UserSession,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
    @Param('id') id: string,
  ) {
    return this.submissionService.update(
      id,
      session.user.id,
      updateSubmissionDto,
    );
  }

  // DELETE admin /:id
  @Delete(':id')
  @Roles(['admin'])
  delete(@Param('id') id: string) {
    return this.submissionService.delete(id);
  }

  @Post('execute')
  async createAndExecute(
    @Session() session: UserSession,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ) {
    return this.submissionService.createAndExecute(
      session.user.id,
      createSubmissionDto,
    );
  }
}
