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

  // 🔓 PUBLIC — frontend uses this
  @Get()
  getAllPublic() {
    return this.heroImagesService.getHeroImages();
  }

  // 🔐 ADMIN — add hero image
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('admin')
  create(@Body() body: CreateHeroImageDto) {
    return this.heroImagesService.create(body);
  }

  // 🔐 ADMIN — update hero image (title, subtitle, order, url)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('admin/:id')
  update(@Param('id') id: string, @Body() body: UpdateHeroImageDto) {
    return this.heroImagesService.update(id, body);
  }

  // 🔐 ADMIN — toggle active/inactive
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('admin/:id/toggle')
  toggle(@Param('id') id: string) {
    return this.heroImagesService.toggleActive(id);
  }

  // 🔐 ADMIN — delete hero image
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('admin/:id')
  delete(@Param('id') id: string) {
    return this.heroImagesService.delete(id);
  }
}
