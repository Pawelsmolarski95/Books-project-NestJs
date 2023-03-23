import { IsNotEmpty, IsNumber, IsString, IsUUID, Length } from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title: string;
  @IsNotEmpty()
  @IsNumber()
  rating: number;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  authorId: string;
}
