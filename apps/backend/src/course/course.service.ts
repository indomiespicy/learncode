import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateCourseDto } from './dto/create-course.dto';

// TODO: make a custom fetch for best practice and clean architecture

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.course.findMany({
      include: {
        _count: {
          select: { modules: true },
        },
      },
    });
  }

  async findOne(slug: string) {
    const result = await this.prisma.course.findUnique({
      where: {
        slug,
      },
      include: {
        modules: {
          orderBy: {
            order: 'asc',
          },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              include: {
                testCases: {
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
        },
      },
    });

    if (!result) throw new NotFoundException('Course not found');

    return result;
  }

  async create(data: CreateCourseDto) {
    try {
      return await this.prisma.course.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Course with this slug already exist');
      }
      throw error;
    }
  }

  async update(id: string, data: UpdateCourseDto) {
    try {
      return await this.prisma.course.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Course with this slug already exists');
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.course.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Course not found');
      }
      throw error;
    }
  }
}
