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
import { HeroImagesService } from './hero-image.service';
import { CreateHeroImageDto } from './dto/create-hero-image.dto';
import { UpdateHeroImageDto } from './dto/update-hero-image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('hero-images')
export class HeroImagesController {
  constructor(private readonly heroImagesService: HeroImagesService) {}

  // 🔓 PUBLIC — used by frontend
  @Get()
  async getAllPublic() {
    return await this.heroImagesService.getHeroImages();
  }

  // 🔐 ADMIN — create
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('admin')
  async create(@Body() body: CreateHeroImageDto) {
    return await this.heroImagesService.create(body);
  }

  // 🔐 ADMIN — update
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('admin/:id')
  async update(@Param('id') id: string, @Body() body: UpdateHeroImageDto) {
    return await this.heroImagesService.update(id, body);
  }

  // 🔐 ADMIN — toggle
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('admin/:id/toggle')
  async toggle(@Param('id') id: string) {
    return await this.heroImagesService.toggleActive(id);
  }

  // 🔐 ADMIN — delete
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('admin/:id')
  async delete(@Param('id') id: string) {
    return await this.heroImagesService.delete(id);
  }
}
