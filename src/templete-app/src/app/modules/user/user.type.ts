export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive?: IsActive;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isActive?: IsActive;
}
