import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Author[]> {
    return this.prismaService.author.findMany();
  }

  getById(id: Author['id']): Promise<Author | null> {
    return this.prismaService.author.findUnique({
      where: { id },
    });
  }

  deleteAuthor(id: Author['id']): Promise<Author | null> {
    return this.prismaService.author.delete({
      where: { id },
    });
  }

  async createNewAuthor(
    authorData: Omit<Author, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Author> {
    try {
      return await this.prismaService.author.create({
        data: authorData,
      });
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException('Name already exists');
      throw err;
    }
  }
  async updateAuthor(
    id: Author['id'],
    authorData: Omit<Author, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    try {
      return this.prismaService.author.update({
        where: { id },
        data: authorData,
      });
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException('Name already exists');
      throw err;
    }
  }
}
