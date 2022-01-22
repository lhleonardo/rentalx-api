import { BAD_REQUEST } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class InvalidUserError extends AppError {
    constructor() {
        super("Invalid user", BAD_REQUEST);
        this.name = "Invalid User";
    }
}
