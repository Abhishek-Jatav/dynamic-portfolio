import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // 🔐 Admin only
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  // 🌍 Public
  @Get()
  getProjects() {
    return this.projectsService.findAll();
  }

  // 🌍 Public - Get by Project ID
  @Get('id/:id')
  getProjectById(@Param('id') id: string) {
    return this.projectsService.findOneById(id);
  }

  // 🌍 Public - Get by Project Name
  @Get('name/:name')
  getProjectByName(@Param('name') name: string) {
    return this.projectsService.findOneByName(name);
  }

  // 🔐 Admin only
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  // 🔐 Admin only
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  deleteProject(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
