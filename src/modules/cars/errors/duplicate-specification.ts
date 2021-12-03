import { AppError } from "../../../errors/app-error";
import { BAD_REQUEST } from "../../core/constants/http-status-code";

export class DuplicateSpecificationError extends AppError {
    constructor(specificationName: string) {
        super(
            `Specification '${specificationName}' already exists`,
            BAD_REQUEST
        );
        this.name = "DuplicateSpecification";
    }
}
