import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';

@Injectable()
export class UserProgressService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.userProgress.findMany();
  }

  async findOne(id: string) {
    const result = await this.prisma.userProgress.findUnique({
      where: { id },
    });

    if (!result) throw new NotFoundException('User progress tidak ditemukan');
    return result;
  }

  async findByCourseId(userId: string, courseId: string) {
    return await this.prisma.userProgress.findMany({
      where: { userId },
    });
  }

  async findAllByUserId(userId: string) {
    const result = await this.prisma.userProgress.findMany({
      where: {
        userId,
      },
    });

    if (!result) {
      throw new NotFoundException(
        'User progress oleh user tersebut tidak ditemukan',
      );
    }

    return result;
  }

  async create(createUserProgressDto: CreateUserProgressDto) {
    try {
      return await this.prisma.userProgress.create({
        data: createUserProgressDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'User progress dengan course yang sama telah ada',
        );
      }
      throw error;
    }
  }

  async update(id: string, updateUserProgressDto: UpdateUserProgressDto) {
    try {
      return await this.prisma.userProgress.update({
        where: { id },
        data: updateUserProgressDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new ConflictException('User Progress not found');
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.userProgress.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User progress tidak ditemukan');
      }
      throw error;
    }
  }
}
