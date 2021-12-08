import { UNAUTHORIZED } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class MissingTokenError extends AppError {
    constructor() {
        super("Missing token.", UNAUTHORIZED);
        this.name = "MissingTokenError";
    }
}
