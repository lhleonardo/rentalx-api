import { HasherProvider } from "../../../../core/providers/criptography/hasher";
import { BasicUsecase } from "../../../../core/usecases/basic-service";
import { ConfirmPasswordError } from "../../../../shared/errors/confirm-password-error";
import { DuplicateEmailError } from "../../errors/duplicate-email-error";
import { User } from "../../models/user";
import { UsersRepository } from "../../repositories/users-repository";

type Request = {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
    driverLicense?: string;
    avatar?: string;
};

export class CreateUserUsecase implements BasicUsecase<Request, User> {
    private readonly usersRepository: UsersRepository;
    private readonly hasherProvider: HasherProvider;

    constructor(
        usersRepository: UsersRepository,
        hasherProvider: HasherProvider
    ) {
        this.usersRepository = usersRepository;
        this.hasherProvider = hasherProvider;
    }
    public async execute({
        email,
        password,
        confirmPassword,
        name,
        avatar,
        driverLicense,
    }: Request): Promise<User> {
        const userAlreadyRegistered = await this.usersRepository.findByEmail(
            email
        );

        if (userAlreadyRegistered) {
            throw new DuplicateEmailError(email);
        }

        console.log(password);
        console.log(confirmPassword);
        if (password !== confirmPassword) {
            throw new ConfirmPasswordError();
        }

        const hashedPassword: string = await this.hasherProvider.hash(password);

        const result = await this.usersRepository.create({
            email,
            name,
            avatar,
            driverLicense,
            admin: false,
            password: hashedPassword,
        });

        delete result.password;

        return result;
    }
}
