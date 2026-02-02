export type Project = {
  _id: string;
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "inactive";
  startDate: string;
  owner: string;
  teamMembers: string[];
  tags: string[];
  progress: number;
  links: string[];
  createdAt: string;
  updatedAt: string;
};
