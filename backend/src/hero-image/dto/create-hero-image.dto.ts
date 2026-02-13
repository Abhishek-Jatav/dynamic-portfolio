import { IsBoolean, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateHeroImageDto {
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
