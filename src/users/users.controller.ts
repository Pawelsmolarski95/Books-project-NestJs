import { CreateUserDTO } from './dto/create-user.dto';
import {
    Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
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

}
