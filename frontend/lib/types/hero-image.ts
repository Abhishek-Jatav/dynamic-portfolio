export type HeroImage = {
  _id: string;
  imageUrl: string;
  title?: string;
  subtitle?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateHeroImageDto = {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  order?: number;
  isActive?: boolean;
};

export type UpdateHeroImageDto = Partial<CreateHeroImageDto>;
