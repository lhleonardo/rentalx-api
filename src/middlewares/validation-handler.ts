import { CelebrateError, isCelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";

export function validationHandler(
    error: Error,
    _: Request,
    response: Response,
    next: NextFunction
): void {
    if (isCelebrateError(error)) {
        const celebrateError = <CelebrateError>error;

        const validations = Array.from(
            celebrateError.details,
            ([key, value]) => {
                return {
                    [key]: value.details.map((validationError) => {
                        const field = validationError.path.join(".");
                        const { message } = validationError;

                        return { field, message };
                    }),
                };
            }
        );

        response
            .status(400)
            .json({ errorType: "ValidationError", validations });
    } else {
        next(error);
    }
}
