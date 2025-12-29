import { PrismaService } from './../prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateModuleDto) {
    try {
      return await this.prisma.module.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Module with this slug already exist');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.module.findMany();
  }

  async findOne(slug: string, courseId: string) {
    const result = await this.prisma.module.findUnique({
      where: {
        courseId_slug: {
          courseId,
          slug,
        },
      },
    });

    if (!result) throw new NotFoundException('Module not found');

    return result;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    try {
      return await this.prisma.module.update({
        where: {
          id,
        },
        data: updateModuleDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Module not found');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.module.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Module not found');
      }
      throw error;
    }
  }
}
