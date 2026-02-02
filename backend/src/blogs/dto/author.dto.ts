import { IsOptional, IsString } from 'class-validator';

export class AuthorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  role?: string;
}
