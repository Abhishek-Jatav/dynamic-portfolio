import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  owner: string;

  @IsArray()
  @IsOptional()
  teamMembers?: string[];

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsNumber()
  @IsOptional()
  progress?: number;

  @IsArray()
  @IsOptional()
  links?: string[];
}
