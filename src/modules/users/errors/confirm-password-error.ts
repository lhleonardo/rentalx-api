import { AppError } from "../../../errors/app-error";
import { BAD_REQUEST } from "../../core/constants/http-status-code";

export class ConfirmPasswordError extends AppError {
    constructor() {
        super("Password confirmation is not match", BAD_REQUEST);
        this.name = "ConfirmPasswordError";
    }
}
