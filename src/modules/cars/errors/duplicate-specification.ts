import { BAD_REQUEST } from "../../../core/constants/http-status-code";
import { AppError } from "../../../shared/errors/app-error";

export class DuplicateSpecificationError extends AppError {
    constructor(specificationName: string) {
        super(
            `Specification '${specificationName}' already exists`,
            BAD_REQUEST
        );
        this.name = "DuplicateSpecification";
    }
}
