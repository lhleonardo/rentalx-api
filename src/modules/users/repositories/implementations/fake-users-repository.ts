import { v4 as uuid } from "uuid";

import { User } from "../../models/user";
import {
    CreateUserDTO,
    UpdateUserDTO,
    UsersRepository,
} from "../users-repository";

export class FakeUsersRepository implements UsersRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async create({
        admin,
        email,
        name,
        password,
        avatar,
        driverLicense,
    }: CreateUserDTO): Promise<User> {
        const dataOperacao = new Date();
        const newUser: User = {
            admin,
            email,
            name,
            password,
            avatar,
            driverLicense,
            id: uuid(),
            createdAt: dataOperacao,
            updatedAt: dataOperacao,
        };

        this.users.push(newUser);

        return newUser;
    }

    update(userId: string, payload: UpdateUserDTO): Promise<User> {
        throw new Error("Method not implemented.");
    }

    updatePassword(userId: string, password: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateAvatar(userId: string, avatar: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email);
    }

    findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}
