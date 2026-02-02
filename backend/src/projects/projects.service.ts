import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const createdProject = new this.projectModel(createProjectDto);
    return createdProject.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const updated = await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Project not found');
    return updated;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.projectModel.findByIdAndDelete(id);

    if (!result) {
      return { message: 'Project not found' };
    }

    return { message: 'Project deleted successfully' };
  }
}
