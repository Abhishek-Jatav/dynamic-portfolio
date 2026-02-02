import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true })
export class Blog {
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  summary?: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  coverImage?: string;

  @Prop({
    type: {
      name: { type: String, required: true },
      role: { type: String, required: true },
    },
    default: { name: 'Admin', role: 'Author' },
  })
  author: {
    name: string;
    role: string;
  };

  @Prop()
  readingTime?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: false })
  isPublished: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// ✅ Auto-generate slug before save using async hook
BlogSchema.pre<BlogDocument>('save', async function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }
});
