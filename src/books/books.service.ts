import { Injectable } from '@nestjs/common';
import { Book, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  getAllBooks(): Promise<Book[]> {
    return this.prismaService.book.findMany({
      include: { author: true },
    });
  }

  getBookById(id: Book['id']): Promise<Book | null> {
    return this.prismaService.book.findUnique({
      where: {
        id,
      },
    });
  }

  deleteBookById(id: Book['id']): Promise<Book | null> {
    return this.prismaService.book.delete({
      where: { id },
    });
  }

  createNewBook(
    bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    return this.prismaService.book.create({
      data: bookData,
    });
  }

  updateBookById(
    id: Book['id'],
    dataBook: Omit<Book, 'id' | 'updatedAt' | 'createdAt'>,
  ) {
    return this.prismaService.book.update({
      where: { id },
      data: dataBook,
    });
  }

  async addLikesBook(bookId: Book['id'], userId: User['id']) {
    return await this.prismaService.book.update({
      where: { id: bookId },
      data: {
        users: {
          create: {
            user: {
              connect: { id: userId },
            },
          },
        },
      },
    });
  }
}
