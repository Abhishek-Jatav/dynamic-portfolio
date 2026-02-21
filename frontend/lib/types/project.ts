// project.ts

export type Folder = {
  name: string;
  files: string[]; // default []
  subFolders: Folder[]; // default []
};

export type Project = {
  _id: string;

  name: string;
  description: string;
  startDate: string;

  liveLink?: string;
  repoLink?: string;
  demoLink?: string;

  folderStructure: Folder[]; // backend default []
  techStack: string[]; // backend default []

  isFeatured: boolean;

  createdAt: string;
  updatedAt: string;
};
