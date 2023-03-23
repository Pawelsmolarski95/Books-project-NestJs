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
} from '@nestjs/common';
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
  async removeBook(@Param('id', new ParseUUIDPipe()) id: string) {
    const bookById = await this.booksService.getBookById(id);
    if (!bookById) throw new NotFoundException('Book not found');
    this.booksService.deleteBookById(id);
    return { success: true }
  }
  @Post('/')
  createBook(@Body() bookData: CreateBookDTO ) {
    return this.booksService.createNewBook(bookData);
  }
  @Put('/:id')
  updateBook(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() bookData: UpdateBookDTO
  ) {
    return this.booksService.updateBookById(id, bookData);
  }
}
