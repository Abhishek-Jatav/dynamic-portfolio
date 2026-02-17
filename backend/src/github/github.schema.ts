import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'github',
  timestamps: true,
})
export class GitHub extends Document {
  // We store only profile, so type will always be "profile"
  @Prop({ required: true, unique: true })
  type: string;

  // Store the profile data in one object
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

  // Used for checking 24h cache expiry
  @Prop({ required: true })
  lastFetchedAt: Date;
}

export const GitHubSchema = SchemaFactory.createForClass(GitHub);
