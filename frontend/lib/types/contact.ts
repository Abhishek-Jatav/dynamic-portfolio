export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateContactDto {
  name: string;
  email: string;
  phone: string;
  message: string;
}
