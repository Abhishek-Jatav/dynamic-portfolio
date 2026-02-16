import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  // ✅ Create Project
  async create(createProjectDto: CreateProjectDto) {
    // check id
    const existingId = await this.projectModel.findOne({
      id: createProjectDto.id,
    });
    if (existingId) {
      throw new ConflictException('Project with this id already exists');
    }

    // check name
    const existingName = await this.projectModel.findOne({
      name: createProjectDto.name,
    });
    if (existingName) {
      throw new ConflictException('Project with this name already exists');
    }

    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  // ✅ Get all projects
  async findAll() {
    return this.projectModel.find().sort({ createdAt: -1 });
  }

  // ✅ Get project by ID
  async findOneById(id: string) {
    const project = await this.projectModel.findOne({ id });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // ✅ Get project by Name
  async findOneByName(name: string) {
    const project = await this.projectModel.findOne({ name });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  // ✅ Update project by ID
  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const updated = await this.projectModel.findOneAndUpdate(
      { id },
      { $set: updateProjectDto },
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Project not found');
    }

    return updated;
  }

  // ✅ Delete project by ID
  async remove(id: string) {
    const deleted = await this.projectModel.findOneAndDelete({ id });

    if (!deleted) {
      throw new NotFoundException('Project not found');
    }

    return {
      message: 'Project deleted successfully',
      deletedProject: deleted,
    };
  }
}
