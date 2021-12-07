import { User } from "../models/user";

export type CreateUserDTO = {
    name: string;
    password: string;
    email: string;
    driverLicense?: string;
    avatar?: string;
    admin: boolean;
};

export type UpdateUserDTO = {
    name: string;
    email: string;
    driverLicense?: string;
};

export interface UsersRepository {
    create(data: CreateUserDTO): Promise<User>;

    update(userId: string, payload: UpdateUserDTO): Promise<User>;

    findByEmail(email: string): Promise<User>;
    findAll(): Promise<User[]>;
}
