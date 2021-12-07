import { BasicUsecase } from "../../../../core/usecases/basic-service";
import { DuplicateEmailError } from "../../errors/duplicate-email-error";
import { User } from "../../models/user";
import { UsersRepository } from "../../repositories/users-repository";

type Request = {
    userId: string;
    name?: string;
    email?: string;
    driverLicense?: string;
};

export class UpdateUserUsecase implements BasicUsecase<Request, User> {
    constructor(private usersRepository: UsersRepository) {}

    public async execute({
        userId,
        name,
        email,
        driverLicense,
    }: Request): Promise<User> {
        if (email) {
            const checkDuplicateEmail = await this.usersRepository.findByEmail(
                email
            );

            if (checkDuplicateEmail) {
                throw new DuplicateEmailError(checkDuplicateEmail.email);
            }
        }

        const updatedUser = await this.usersRepository.update(userId, {
            name,
            email,
            driverLicense,
        });

        delete updatedUser.password;

        return updatedUser;
    }
}
