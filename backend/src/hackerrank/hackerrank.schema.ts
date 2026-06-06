import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HackerRankDocument = HydratedDocument<HackerRank>;

@Schema({
  collection: 'hackerrank',
  timestamps: true,
})
export class HackerRank {
  @Prop({ required: true, unique: true })
  type: string;

  @Prop({ type: Object, required: true })
  data: {
    username: string;
    badges: number;
    stars: number;
    lastUpdated: string;
  };

  @Prop({ required: true })
  lastFetchedAt: Date;
}

export const HackerRankSchema = SchemaFactory.createForClass(HackerRank);
