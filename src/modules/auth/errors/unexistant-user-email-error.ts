import { BAD_REQUEST } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class UnexistantUserEmailError extends AppError {
    constructor() {
        super("Email is not exists.", BAD_REQUEST);
        this.name = "UnexistantUserEmailError";
    }
}
