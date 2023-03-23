import { PrismaService } from './../shared/services/prisma.service';
import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, PrismaService]
})
export class AuthorsModule {}
