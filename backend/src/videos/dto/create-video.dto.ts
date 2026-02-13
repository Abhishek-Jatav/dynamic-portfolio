import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  youtubeUrl: string;

  @IsString()
  description?: string;
}
