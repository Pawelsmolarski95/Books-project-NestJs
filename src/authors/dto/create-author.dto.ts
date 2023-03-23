import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAuthorDTO {
  @IsNotEmpty()
  @Length(3, 100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(1, 3)
  @IsString()
  country: string;
}
