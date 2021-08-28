import { Request, Response } from "express";

export interface BasicController {
    handle: (request: Request, response: Response) => Promise<Response>;
}
