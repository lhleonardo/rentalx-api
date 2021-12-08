import { UNAUTHORIZED } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class InvalidTokenError extends AppError {
    constructor() {
        super("Invalid token.", UNAUTHORIZED);
        this.name = "InvalidTokenError";
    }
}
