import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: 'active' })
  status: string;

  @Prop()
  startDate: string;

  @Prop()
  owner: string;

  @Prop([String])
  teamMembers: string[];

  @Prop([String])
  tags: string[];

  @Prop({ default: 0 })
  progress: number;

  @Prop([String])
  links: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
