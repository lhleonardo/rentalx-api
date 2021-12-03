import { User } from "../models/user";

export type CreateUserDTO = {
    name: string;
    password: string;
    email: string;
    driverLicense?: string;
    avatar?: string;
    admin: boolean;
};

export interface UsersRepository {
    create(data: CreateUserDTO): Promise<User>;

    findByEmail(email: string): Promise<User>;
    findAll(): Promise<User[]>;
}
