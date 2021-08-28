import { Request, Response } from "express";

export function ListCategoriesController(
    request: Request,
    response: Response
): Promise<Response> {
    const service = new ListCategoriesService(categoriesRepository);

    const categories = await service.execute();

    return response.status(200).json(categories);
}
