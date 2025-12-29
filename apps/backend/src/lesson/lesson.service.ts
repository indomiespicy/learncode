import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}
  async create(createLessonDto: CreateLessonDto) {
    try {
      return await this.prisma.lesson.create({
        data: createLessonDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Lesson with this slug already exist');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.lesson.findMany();
  }

  async findOne(slug: string, moduleId: string) {
    const result = await this.prisma.lesson.findUnique({
      where: {
        moduleId_slug: {
          moduleId,
          slug,
        },
      },
    });

    if (!result) throw new NotFoundException('Lesson not found!');
    return result;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    try {
      return await this.prisma.lesson.update({
        where: {
          id,
        },
        data: updateLessonDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Lesson with this slug already exist');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.lesson.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Lesson not found');
      }
      throw error;
    }
  }
}
