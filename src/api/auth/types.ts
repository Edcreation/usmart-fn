import { User } from "../users/types";

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    role: string;
    password: string;
    confirmPassword?: string;
}
