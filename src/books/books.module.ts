import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, UsersService],
  imports: [PrismaModule]

})
export class BooksModule {}
