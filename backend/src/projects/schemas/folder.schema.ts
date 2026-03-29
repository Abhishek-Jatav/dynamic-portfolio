import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Folder {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], default: [] })
  files: string[];

  // ✅ IMPORTANT: keep flexible to support existing DB data
  @Prop({ type: [Object], default: [] })
  subFolders: Folder[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
