import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroImagesController } from './hero-images.controller';
import { HeroImagesService } from './hero-image.service';
import { HeroImage, HeroImageSchema } from './schema/hero-image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeroImage.name, schema: HeroImageSchema },
    ]),
  ],
  controllers: [HeroImagesController],
  providers: [HeroImagesService],
})
export class HeroImagesModule {}
