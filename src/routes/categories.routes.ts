import { Router } from "express";

import { InMemoryCategoriesRepository } from "../modules/cars/repositories/implementations/in-memory-categories-repository";
import {
    CreateCategoryService,
    ListCategoriesService,
} from "../modules/cars/services/categories";

const categoriesRoutes = Router();

const categoriesRepository = new InMemoryCategoriesRepository();

categoriesRoutes.post("/categories", async (request, response) => {
    const { name, description } = request.body;

    const service = new CreateCategoryService(categoriesRepository);

    const created = await service.execute({ name, description });

    return response.status(201).json(created);
});

categoriesRoutes.get("/categories", async (request, response) => {
    const service = new ListCategoriesService(categoriesRepository);

    const categories = await service.execute();

    return response.status(200).json(categories);
});

export { categoriesRoutes };
