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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
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
}
