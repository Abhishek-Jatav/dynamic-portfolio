import type { Folder } from "./project";

export type CreateProjectDto = {
  name: string;
  description: string;
  startDate: string;

  liveLink?: string;
  repoLink?: string;
  demoLink?: string;

  folderStructure?: Folder[];
  techStack?: string[];

  isFeatured?: boolean;
};

export type UpdateProjectDto = Partial<CreateProjectDto>;
