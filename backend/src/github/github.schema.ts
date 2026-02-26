import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GitHubDocument = HydratedDocument<GitHub>;

@Schema({
  collection: 'github',
  timestamps: true,
})
export class GitHub {
  @Prop({ required: true, unique: true })
  type: string;

  @Prop({ type: Object, required: true })
  data: {
    username: string;
    name: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    publicRepos: number;
    profileUrl: string;
    joinedAt: string;
  };

  @Prop({ required: true })
  lastFetchedAt: Date;
}

export const GitHubSchema = SchemaFactory.createForClass(GitHub);
