import { BAD_REQUEST } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class DuplicateEmailError extends AppError {
    constructor(email: string) {
        super(`E-mail '${email}' already exists`, BAD_REQUEST);
        this.name = "DuplicateEmail";
    }
}
