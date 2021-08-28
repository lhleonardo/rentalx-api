import { Router } from "express";

import { makeCreateCategoryController } from "../../../usecases/create-category/create-category-factory";
import { makeListCategoriesController } from "../../../usecases/list-categories/list-categories-factory";

const categoriesRoutes = Router();

categoriesRoutes.post("/categories", makeCreateCategoryController().handle);
categoriesRoutes.get("/categories", makeListCategoriesController().handle);

export { categoriesRoutes };
