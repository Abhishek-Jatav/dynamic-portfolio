export type ProjectFile = {
  name: string;
  path: string;
  type?: string;
};

export type ProjectFolder = {
  name: string;
  path: string;
  files?: ProjectFile[];
  subFolders?: ProjectFolder[];
};

export type Project = {
  _id?: string;

  id: string;
  name: string;

  description?: string;
  status?: string;
  startDate?: string;

  owner: string;

  teamMembers?: string[];
  tags?: string[];
  progress?: number;
  links?: string[];

  folders?: ProjectFolder[];

  createdAt?: string;
  updatedAt?: string;
};

export type CreateProjectPayload = Omit<
  Project,
  "_id" | "createdAt" | "updatedAt"
>;

export type UpdateProjectPayload = Partial<CreateProjectPayload>;
