import { Router } from "express";
import multer from "multer";

import { makeCreateCategoryController } from "../../../usecases/create-category/create-category-factory";
import { makeImportCategoryController } from "../../../usecases/import-category/import-category-factory";
import { makeListCategoriesController } from "../../../usecases/list-categories/list-categories-factory";

const categoriesRoutes = Router();

const uploadConfiguration = multer({
    dest: "./tmp",
});

categoriesRoutes.post("/categories", (req, res) =>
    makeCreateCategoryController().handle(req, res)
);

categoriesRoutes.get("/categories", (req, res) =>
    makeListCategoriesController().handle(req, res)
);

categoriesRoutes.post(
    "/categories/import",
    uploadConfiguration.single("file"),
    (req, res) => makeImportCategoryController().handle(req, res)
);

export { categoriesRoutes };
