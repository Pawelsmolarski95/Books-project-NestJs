import { PrismaModule } from './../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [PrismaModule]
})
export class AuthorsModule {}
