import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from './../auth/admin-auth.guard';
import { CreateUserDTO } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  getAllUsers() {
    return this.userService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const userById = await this.userService.getUserById(id);
    if (!userById) throw new NotFoundException('User not exist');
    return userById;
  }

  @Get('/:email')
  async getByEmail(@Param('email') email: string) {
    const userByEmail = await this.userService.getUserByEmail(email);
    if (!userByEmail)
      throw new NotFoundException('User with this email not exist');
    return userByEmail;
  }
  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.userService.getUserById(id)))
      throw new NotFoundException('User not found');
    await this.userService.deleteUser(id);
    return { success: true };
  }
}
