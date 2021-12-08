import { BAD_REQUEST } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class InvalidUserTokenError extends AppError {
    constructor() {
        super("User is invalid or not exists.", BAD_REQUEST);
        this.name = "InvalidUserTokenError";
    }
}
