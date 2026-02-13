import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class HeroImage extends Document {
  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  title?: string;

  @Prop()
  subtitle?: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const HeroImageSchema = SchemaFactory.createForClass(HeroImage);
