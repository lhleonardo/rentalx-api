import { HasherProvider } from "../../../../core/providers/criptography/hasher";
import { TokenEncrypter } from "../../../../core/providers/criptography/token-encrypter";
import { BasicUsecase } from "../../../../core/usecases/basic-service";
import { UsersRepository } from "../../../users/repositories/users-repository";
import { BadCredentialsError } from "../../errors/bad-credentials-error";

type RequestUsecase = {
    email: string;
    password: string;
};

type ResponseUsecase = {
    user: {
        name: string;
        email: string;
    };
    token: string;
};

export class LoginUseCase
    implements BasicUsecase<RequestUsecase, ResponseUsecase>
{
    private usersRepository: UsersRepository;
    private hashManager: HasherProvider;
    private tokenGenerator: TokenEncrypter;

    constructor(
        usersRepository: UsersRepository,
        hashManager: HasherProvider,
        tokenGenerator: TokenEncrypter
    ) {
        this.usersRepository = usersRepository;
        this.hashManager = hashManager;
        this.tokenGenerator = tokenGenerator;
    }

    public async execute({
        email,
        password,
    }: RequestUsecase): Promise<ResponseUsecase> {
        const userExists = await this.usersRepository.findByEmail(email);

        if (!userExists) {
            throw new BadCredentialsError();
        }

        const savedPassword = userExists.password;

        const passwordMatch = await this.hashManager.compare(
            password,
            savedPassword
        );

        if (!passwordMatch) {
            throw new BadCredentialsError();
        }

        const token = await this.tokenGenerator.encrypt(userExists.id);

        return {
            user: {
                name: userExists.name,
                email: userExists.email,
            },
            token,
        };
    }
}
