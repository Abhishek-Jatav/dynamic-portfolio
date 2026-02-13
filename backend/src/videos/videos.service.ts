import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { extractYoutubeId } from './utils/extract-youtube-id';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name)
    private videoModel: Model<VideoDocument>,
  ) {}

  async create(dto: CreateVideoDto) {
    const videoId = extractYoutubeId(dto.youtubeUrl);

    if (!videoId) {
      throw new BadRequestException('Invalid YouTube URL');
    }

    return this.videoModel.create({
      title: dto.title,
      youtubeId: videoId,
      description: dto.description,
    });
  }

  async findAll() {
    return this.videoModel.find().sort({ createdAt: -1 });
  }

  async findOne(id: string) {
    return this.videoModel.findById(id);
  }

  async delete(id: string) {
    return this.videoModel.findByIdAndDelete(id);
  }
}
