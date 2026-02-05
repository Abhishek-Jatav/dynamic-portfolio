export type Author = {
  name: string;
  role: string;
};

export type Blog = {
  _id: string;
  projectId: string;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  coverImage?: string;
  author: Author;
  readingTime?: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
};
