export interface Video {
  _id: string;
  title: string;
  youtubeId: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateVideoPayload {
  title: string;
  youtubeUrl: string;
  description?: string;
}
