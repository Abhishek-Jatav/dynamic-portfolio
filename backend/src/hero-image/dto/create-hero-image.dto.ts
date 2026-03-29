import { IsBoolean, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

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
  @Type(() => Number)
  @IsInt()
  order?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
