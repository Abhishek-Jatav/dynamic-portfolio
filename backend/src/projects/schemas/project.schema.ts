import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Folder, FolderSchema } from './folder.schema';

export type ProjectDocument = Project & Document;

@Schema({
  collection: 'projects',
  timestamps: true,
})
export class Project {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  liveLink: string;

  @Prop()
  repoLink: string;

  @Prop()
  demoLink: string;

  @Prop({ type: [FolderSchema], default: [] })
  folderStructure: Folder[];

  @Prop({ type: [String], default: [] })
  techStack: string[];

  @Prop({ default: false })
  isFeatured: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
