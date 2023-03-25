import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  Delete,
  Post,
  Body,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(
    private booksService: BooksService,
    private usersService: UsersService,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const bookById = await this.booksService.getBookById(id);
    if (!bookById) throw new NotFoundException('Book not found');
    return bookById;
  }
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async removeBook(@Param('id', new ParseUUIDPipe()) id: string) {
    const bookById = await this.booksService.getBookById(id);
    if (!bookById) throw new NotFoundException('Book not found');
    this.booksService.deleteBookById(id);
    return { success: true };
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  createBook(@Body() bookData: CreateBookDTO) {
    return this.booksService.createNewBook(bookData);
  }
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  updateBook(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() bookData: UpdateBookDTO,
  ) {
    return this.booksService.updateBookById(id, bookData);
  }

  // @Post('like/:id')
  // @UseGuards(JwtAuthGuard)
  // async addLike(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
  //   const userId = req.user.id;
  //   const bookId = id;

  //   const findBook = await this.booksService.getBookById(id);
  //   const findUser = await this.usersService.getUserById(id);

  //   if (!findBook && findUser)
  //     throw new NotFoundException('Check your book or user');
  //   this.booksService.addLikesBook(userId, bookId);
  //   return { success: true };
  // }

  @Post('/like/')
  @UseGuards(JwtAuthGuard)
  async like(
    @Param('bookId', new ParseUUIDPipe()) bookId: string,
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ) {}
}
