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
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { AllowAnonymous, Roles, Session } from '@thallesp/nestjs-better-auth';

@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  // GET /modules
  @Get()
  @AllowAnonymous()
  findAll() {
    return this.moduleService.findAll();
  }
  // GET /modules/:slug?:courseId
  @Get(':slug')
  @AllowAnonymous()
  findOne(@Param('slug') slug: string, @Query('courseId') courseId: string) {
    return this.moduleService.findOne(slug, courseId);
  }

  // POST /modules
  @Post()
  @Roles(['admin'])
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  // PATCH /modules/:id
  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.moduleService.update(id, updateModuleDto);
  }
  // DELETE /modules/:id
  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.moduleService.remove(id);
  }
}
