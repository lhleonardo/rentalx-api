import { AppError } from "../../../errors/app-error";
import { BAD_REQUEST } from "../../core/constants/http-status-code";

export class DuplicateCategoryError extends AppError {
    constructor(categoryName: string) {
        super(`Category ${categoryName} already exists`, BAD_REQUEST);
    }
}
