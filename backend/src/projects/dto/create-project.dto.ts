import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// --------------------
// File DTO
// --------------------
export class ProjectFileDto {
  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsString()
  @IsOptional()
  type?: string;
}

// --------------------
// Folder DTO (recursive)
// --------------------
export class ProjectFolderDto {
  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectFileDto)
  @IsOptional()
  files?: ProjectFileDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectFolderDto)
  @IsOptional()
  subFolders?: ProjectFolderDto[];
}

// --------------------
// Create Project DTO
// --------------------
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

  // ✅ NEW: Folder structure
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectFolderDto)
  @IsOptional()
  folders?: ProjectFolderDto[];
}
