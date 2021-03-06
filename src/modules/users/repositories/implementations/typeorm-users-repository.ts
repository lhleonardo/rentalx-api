import { getRepository, Repository } from "typeorm";

import { User } from "../../models/user";
import {
    CreateUserDTO,
    UpdateUserDTO,
    UsersRepository,
} from "../users-repository";

export class TypeormUsersRepository implements UsersRepository {
    private readonly externalRepo: Repository<User>;

    constructor() {
        this.externalRepo = getRepository(User);
    }

    public create(data: CreateUserDTO): Promise<User> {
        const bean = this.externalRepo.create(data);

        return this.externalRepo.save(bean);
    }

    public async update(userId: string, payload: UpdateUserDTO): Promise<User> {
        // atualiza
        await this.externalRepo.update(userId, payload);
        // busca o dado atualizado para retorno
        return this.externalRepo.findOne(userId);
    }

    public async updatePassword(
        userId: string,
        password: string
    ): Promise<void> {
        await this.externalRepo.update(userId, { password });
    }

    public async updateAvatar(userId: string, avatar: string): Promise<void> {
        await this.externalRepo.update(userId, { avatar });
    }

    public findByEmail(email: string): Promise<User> {
        const userExists = this.externalRepo.findOne({ email });
        return userExists;
    }

    public findById(id: string): Promise<User> {
        return this.externalRepo.findOne(id);
    }

    public findAll(): Promise<User[]> {
        return this.externalRepo.find({});
    }
}
