import { BAD_REQUEST } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class DuplicateCategoryError extends AppError {
    constructor(categoryName: string) {
        super(`Category '${categoryName}' already exists`, BAD_REQUEST);
        this.name = "DuplicateCategory";
    }
}
