import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  create(createBlogDto: CreateBlogDto) {
    return this.blogModel.create(createBlogDto);
  }

  findAll() {
    return this.blogModel
      .find({ isPublished: true })
      .populate('projectId')
      .sort({ createdAt: -1 });
  }

  findAllAdmin() {
    return this.blogModel.find().sort({ createdAt: -1 });
  }

  findBySlug(slug: string) {
    return this.blogModel.findOne({ slug, isPublished: true });
  }

  findByProject(projectId: string) {
    return this.blogModel.find({ projectId, isPublished: true });
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('Invalid blog ID');

    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    if (!isValidObjectId(id)) throw new NotFoundException('Invalid blog ID');

    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException('Blog not found');

    blog.set(updateBlogDto);

    // regenerate slug if title changed and slug not provided
    if (updateBlogDto.title && !updateBlogDto.slug) {
      blog.slug = updateBlogDto.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '');
    }

    await blog.save();
    return blog;
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('Invalid blog ID');

    const blog = await this.blogModel.findByIdAndDelete(id);
    if (!blog) throw new NotFoundException('Blog not found');

    return { message: 'Blog deleted successfully' };
  }
}
