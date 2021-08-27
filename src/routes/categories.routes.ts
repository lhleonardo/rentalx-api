import { Router } from "express";
import { v4 as uuid } from "uuid";

import { Category } from "../models/category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.use("/categories");
categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const newCategory: Category = {
        id: uuid(),
        name,
        description,
        createdAt: new Date(),
    };

    categories.push(newCategory);

    return response.status(201).json(newCategory);
});

export { categoriesRoutes };
