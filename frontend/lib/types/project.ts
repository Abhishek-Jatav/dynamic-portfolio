export interface Folder {
  name: string;
  files: string[];
  subFolders: Folder[];
}

export interface Project {
  _id: string;

  name: string;
  description: string;
  startDate: string;

  liveLink?: string;
  repoLink?: string;
  demoLink?: string;

  folderStructure: Folder[];

  techStack: string[];

  isFeatured: boolean;

  createdAt: string;
  updatedAt: string;
}
