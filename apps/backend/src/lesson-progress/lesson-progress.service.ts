import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { P } from 'node_modules/better-auth/dist/index-DWd5qAaC.mjs';
import { PrismaService } from 'src/prisma.service';
import { CreateLessonProgressDto } from './dto/create-lesson-progress.dto,';
import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto';

@Injectable()
export class LessonProgressService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.lessonProgress.findMany();
  }

  async findByLessonId(userId: string, lessonId: string) {
    return await this.prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });
  }

  async findAllByUserId(userId: string) {
    return await this.prisma.lessonProgress.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string) {
    const result = await this.prisma.lessonProgress.findUnique({
      where: {
        id,
      },
    });

    if (!result) throw new NotFoundException('Lesson progress not found');
  }

  async create(createLessonProgressDto: CreateLessonProgressDto) {
    try {
      return await this.prisma.lessonProgress.create({
        data: createLessonProgressDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('This user already have lesson progress ');
      }
      throw error;
    }
  }

  async update(id: string, updateLessonProgressDto: UpdateLessonProgressDto) {
    try {
      return await this.prisma.lessonProgress.update({
        where: { id },
        data: updateLessonProgressDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Cannot find the lesson progress');
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.lessonProgress.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new NotFoundException('Lesson progress tidak ditemukan');
      }
      throw error;
    }
  }
}
