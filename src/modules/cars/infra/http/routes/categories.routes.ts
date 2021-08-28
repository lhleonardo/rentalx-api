import { Router } from "express";

import { makeCreateCategoryController } from "../../../usecases/create-category/create-category-factory";
import { makeListCategoriesController } from "../../../usecases/list-categories/list-categories-factory";

const categoriesRoutes = Router();

categoriesRoutes.post("/categories", (req, res) =>
    makeCreateCategoryController().handle(req, res)
);
categoriesRoutes.get("/categories", (req, res) =>
    makeListCategoriesController().handle(req, res)
);

export { categoriesRoutes };
