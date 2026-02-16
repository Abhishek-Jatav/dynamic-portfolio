import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

// -------------------
// File Schema
// -------------------
@Schema({ _id: false })
export class ProjectFile {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  path: string; // ex: "src/components/Button.tsx"

  @Prop()
  type?: string; // ex: "file", "image", "pdf"
}

export const ProjectFileSchema = SchemaFactory.createForClass(ProjectFile);

// -------------------
// Folder Schema
// -------------------
@Schema({ _id: false })
export class ProjectFolder {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  path: string; // ex: "src/components"

  // Files inside this folder
  @Prop({ type: [ProjectFileSchema], default: [] })
  files: ProjectFile[];

  // Subfolders (recursive)
  @Prop({ type: [Object], default: [] })
  subFolders: ProjectFolder[];
}

export const ProjectFolderSchema = SchemaFactory.createForClass(ProjectFolder);

// -------------------
// Project Schema
// -------------------
@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  startDate: string;

  @Prop([String])
  links: string[];

  // ✅ Folder structure
  @Prop({ type: [ProjectFolderSchema], default: [] })
  folders: ProjectFolder[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
