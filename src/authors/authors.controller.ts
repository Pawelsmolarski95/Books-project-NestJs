import { AuthorsService } from './authors.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAuthorDTO } from './dto/create-author.dto';
import { UpdateAuthorDTO } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get('/')
  getAuthors() {
    return this.authorsService.getAll();
  }
  @Get('/:id')
  async GetAuthorsById(@Param('id', new ParseUUIDPipe()) id: string) {
    const authorById = await this.authorsService.getById(id);
    if (!authorById) throw new NotFoundException('Author not found');
    return authorById;
  }
  @Delete('/:id')
  async removeAuthor(@Param('id', new ParseUUIDPipe()) id: string) {
    const authorById = await this.authorsService.getById(id);
    if (!authorById) throw new NotFoundException('Author not found');
    await this.authorsService.deleteAuthor(id);
    return { success: true };
  }
  @Post('/')
  createAuthor(@Body() authorData: CreateAuthorDTO) {
    return this.authorsService.createNewAuthor(authorData);
  }
  @Put('/:id')
  async updateAuthors(
    @Param('id', new ParseUUIDPipe()) id:string ,
    @Body() authorData: UpdateAuthorDTO
  ) {
    const authorById = await this.authorsService.getById(id);
    if (!authorById) throw new NotFoundException('Author not found');
    await this.authorsService.updateAuthor(id, authorData)
    return { success: true };
  }
}
