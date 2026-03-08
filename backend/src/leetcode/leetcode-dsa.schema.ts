import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeetcodeDSADocument = HydratedDocument<LeetcodeDSA>;

@Schema({
  collection: 'leetcodeDSA',
  timestamps: true,
})
export class LeetcodeDSA {
  @Prop({ required: true, unique: true })
  type: string;

  @Prop({ type: Object, required: true })
  data: {
    username: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    lastUpdated: string;
  };

  @Prop({ required: true })
  lastFetchedAt: Date;
}

export const LeetcodeDSASchema = SchemaFactory.createForClass(LeetcodeDSA);
