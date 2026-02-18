import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async findAll() {
    return this.projectModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async findByName(name: string) {
    const project = await this.projectModel.findOne({
      name: name,
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      updateProjectDto,
      { new: true },
    );

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async remove(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return { message: 'Project deleted successfully' };
  }

  async deleteByName(name: string) {
    const deleted = await this.projectModel.findOneAndDelete({ name });

    if (!deleted) {
      throw new NotFoundException(`Project with name "${name}" not found`);
    }

    return {
      message: 'Project deleted successfully',
      deletedProject: deleted,
    };
  }
}
