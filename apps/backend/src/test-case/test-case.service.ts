import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';

@Injectable()
export class TestCaseService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return this.prisma.testCase.findMany();
  }

  async findOne(id: string) {
    const result = await this.prisma.testCase.findUnique({
      where: { id },
    });

    if (!result) throw new NotFoundException('Test case not found');
    return result;
  }

  async findByLesson(lessonId: string) {
    try {
      return await this.prisma.testCase.findMany({
        where: {
          lessonId,
        },
        orderBy: {
          order: 'asc',
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Test case not found by lessonId');
      }
      throw error;
    }
  }

  async create(data: CreateTestCaseDto) {
    return await this.prisma.testCase.create({
      data,
    });
  }

  async update(id: string, data: UpdateTestCaseDto) {
    try {
      return await this.prisma.testCase.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Test case not found');
      }
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.testCase.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Test case not found');
      }
      throw error;
    }
  }
}
