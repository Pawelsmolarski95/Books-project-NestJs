import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

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
}
