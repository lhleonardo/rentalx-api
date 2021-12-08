import { BAD_REQUEST } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class InvalidResetTokenError extends AppError {
    constructor() {
        super("Invalid reset token.", BAD_REQUEST);
        this.name = "InvalidResetTokenError";
    }
}
