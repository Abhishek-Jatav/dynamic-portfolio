import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  files?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFolderDto)
  @IsOptional()
  subFolders?: CreateFolderDto[];
}
