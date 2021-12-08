import { BasicUsecase } from "../../../../core/usecases/basic-service";
import { UsersRepository } from "../../../users/repositories/users-repository";
import { UnexistantUserEmailError } from "../../errors/unexistant-user-email-error";
import { PasswordRecoveryTokenRepository } from "../../repositories/password-recovery-token-repository";

type Request = {
    email: string;
};

export class ForgotPasswordUsecase implements BasicUsecase<Request, void> {
    private usersRepository: UsersRepository;
    private tokenRecoveryPasswordRepository: PasswordRecoveryTokenRepository;

    constructor(
        usersRepository: UsersRepository,
        tokenRecoveryPasswordRepository: PasswordRecoveryTokenRepository
    ) {
        this.usersRepository = usersRepository;
        this.tokenRecoveryPasswordRepository = tokenRecoveryPasswordRepository;
    }

    public async execute({ email }: Request): Promise<void> {
        const userToRecovery = await this.usersRepository.findByEmail(email);

        if (!userToRecovery) {
            throw new UnexistantUserEmailError();
        }

        const token = await this.tokenRecoveryPasswordRepository.createToken({
            userId: userToRecovery.id,
            expiresIn: this.getDatePlusTwoHours(),
        });

        // enviar por e-mail ou adicionar em uma fila para um
        // worker fazer o envio
        console.log(`Token gerado: ${token}`);
    }

    private getDatePlusTwoHours(): Date {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 2);
        return currentDate;
    }
}
