import { BAD_REQUEST } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class ConfirmPasswordError extends AppError {
    constructor() {
        super("Password confirmation is not match", BAD_REQUEST);
        this.name = "ConfirmPasswordError";
    }
}
