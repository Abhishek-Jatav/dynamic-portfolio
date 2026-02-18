import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFolderDto } from './create-folder.dto';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  startDate: string;

  @IsString()
  @IsOptional()
  liveLink?: string;

  @IsString()
  @IsOptional()
  repoLink?: string;

  @IsString()
  @IsOptional()
  demoLink?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFolderDto)
  @IsOptional()
  folderStructure?: CreateFolderDto[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  techStack?: string[];

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
