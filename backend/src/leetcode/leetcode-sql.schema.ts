import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LeetcodeSQLDocument = HydratedDocument<LeetcodeSQL>;

@Schema({
  collection: 'leetcodeSQL',
  timestamps: true,
})
export class LeetcodeSQL {
  @Prop({ required: true, unique: true })
  type: string;

  @Prop({ type: Object, required: true })
  data: {
    username: string;
    sqlSolved: number;
    lastUpdated: string;
  };

  @Prop({ required: true })
  lastFetchedAt: Date;
}

export const LeetcodeSQLSchema = SchemaFactory.createForClass(LeetcodeSQL);
