import { BAD_CREDENTIALS } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class BadCredentialsError extends AppError {
    constructor() {
        super("Bad credentials", BAD_CREDENTIALS);
        this.name = "BadCredentialsError";
    }
}
