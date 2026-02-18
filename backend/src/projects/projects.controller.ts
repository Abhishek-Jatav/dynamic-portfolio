import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // 🔓 PUBLIC ROUTES

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('by-id/:id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Get('by-name/:name')
  findByName(@Param('name') name: string) {
    return this.projectService.findByName(name);
  }

  // 🔐 PROTECTED ROUTES (ADMIN ONLY)

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('by-name/:name')
  deleteByName(@Param('name') name: string) {
    return this.projectService.deleteByName(name);
  }
}

