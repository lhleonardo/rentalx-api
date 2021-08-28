import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error";

export function exceptionHandler(
    error: Error,
    _: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): Response {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({ error: error.message });
    }

    console.error(error);

    return response.status(500).json({ error: "Internal server error" });
}
