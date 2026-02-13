import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() dto: CreateVideoDto) {
    return this.videosService.create(dto);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.videosService.delete(id);
  }
}
