import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeetcodeDocument = HydratedDocument<Leetcode>;

@Schema({
  collection: 'leetcode',
  timestamps: true,
})
export class Leetcode {
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

export const LeetcodeSchema = SchemaFactory.createForClass(Leetcode);
