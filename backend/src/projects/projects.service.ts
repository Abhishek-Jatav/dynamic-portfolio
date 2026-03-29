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
    const project = new this.projectModel({
      ...createProjectDto,
      startDate: new Date(createProjectDto.startDate),
    });

    return await project.save();
  }

  async findAll() {
    // ✅ IMPORTANT: lean() to avoid schema parsing issues
    return await this.projectModel.find().sort({ createdAt: -1 }).lean().exec();
  }

  async findOne(id: string) {
    const project = await this.projectModel.findById(id).lean().exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async findByName(name: string) {
    const project = await this.projectModel.findOne({ name }).lean().exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    if (updateProjectDto.startDate) {
      updateProjectDto.startDate = new Date(updateProjectDto.startDate) as any;
    }

    const project = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .lean()
      .exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async remove(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id).exec();

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return { message: 'Project deleted successfully' };
  }

  async deleteByName(name: string) {
    const deleted = await this.projectModel
      .findOneAndDelete({ name })
      .lean()
      .exec();

    if (!deleted) {
      throw new NotFoundException(`Project with name "${name}" not found`);
    }

    return {
      message: 'Project deleted successfully',
      deletedProject: deleted,
    };
  }
}
