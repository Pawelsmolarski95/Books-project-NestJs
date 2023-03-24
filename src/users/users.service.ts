import { Injectable } from '@nestjs/common';
import { Password, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
        include: { password: true },
    });
  }

  getUserById(id: User['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  getUserByEmail(email: User['email'],
  ): Promise<(User & { password: Password }) | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { password: true }
    });
  }

  createNewUser(
    userData: Omit<User, 'id' | 'role'>,
    password: Password['hashedPassword'],
  ): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...userData,
        password: {
          create: {
            hashedPassword: password,
          },
        },
      },
    });
  }

  async updateUserById(
    id: User['id'],
    userData: Omit<User, 'id' | 'role'>,
    password: Password['hashedPassword'] | undefined,
  ): Promise<User> {
    if (password === undefined)
      return await this.prismaService.user.update({
        where: { id },
        data: userData,
      });

    return await this.prismaService.user.update({
      where: { id },
      data: {
        ...userData,
        password: {
          update: {
            hashedPassword: password,
          },
        },
      },
    });
  }

  async deleteUser(id: User['id']): Promise<User | null> {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
