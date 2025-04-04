import { BaseModel } from "../../utils/types";

export interface User extends BaseModel {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  password: string;
  phone: string | null;
}

export type UpdateUserPayload = Partial<User>

export type CreateUserPayload = Omit<User, "id">

export type UserRole = "admin" | "student" | "teacher";
