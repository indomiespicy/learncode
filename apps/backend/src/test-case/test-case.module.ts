import { Module } from '@nestjs/common';
import { TestCaseController } from './test-case.controller';
import { TestCaseService } from './test-case.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TestCaseController],
  providers: [TestCaseService, PrismaService],
  exports: [TestCaseService],
})
export class TestCaseModule {}
