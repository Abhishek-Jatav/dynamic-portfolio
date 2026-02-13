import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroImage } from './schema/hero-image.schema';
import { CreateHeroImageDto } from './dto/create-hero-image.dto';
import { UpdateHeroImageDto } from './dto/update-hero-image.dto';

@Injectable()
export class HeroImagesService {
  constructor(
    @InjectModel(HeroImage.name)
    private readonly heroImageModel: Model<HeroImage>,
  ) {}

  // 🔓 PUBLIC
  async getHeroImages() {
    return this.heroImageModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .lean();
  }

  // 🔐 ADMIN
  async create(dto: CreateHeroImageDto) {
    const created = await this.heroImageModel.create({
      ...dto,
      order: dto.order ?? 0,
      isActive: dto.isActive ?? true,
    });

    return created;
  }

  // 🔐 ADMIN
  async update(id: string, dto: UpdateHeroImageDto) {
    const updated = await this.heroImageModel.findByIdAndUpdate(
      id,
      { $set: dto },
      { new: true },
    );

    if (!updated) throw new NotFoundException('Hero image not found');
    return updated;
  }

  // 🔐 ADMIN — toggle active/inactive
  async toggleActive(id: string) {
    const heroImage = await this.heroImageModel.findById(id);

    if (!heroImage) throw new NotFoundException('Hero image not found');

    heroImage.isActive = !heroImage.isActive;
    await heroImage.save();

    return heroImage;
  }

  // 🔐 ADMIN
  async delete(id: string) {
    const deleted = await this.heroImageModel.findByIdAndDelete(id);

    if (!deleted) throw new NotFoundException('Hero image not found');
    return { message: 'Hero image deleted successfully' };
  }
}
