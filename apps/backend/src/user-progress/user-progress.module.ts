import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserProgressService } from './user-progress.service';
import { UserProgressController } from './user-progress.controller';

@Module({
  controllers: [UserProgressController],
  providers: [UserProgressService, PrismaService],
})
export class UserProgressModule {}
