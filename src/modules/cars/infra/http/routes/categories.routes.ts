import { Router } from "express";
import multer from "multer";

import ensureAuthenticated from "../../../../auth/middlewares/ensure-authenticated";
import {
    createCategoryValidation,
    makeCreateCategoryController,
} from "../../../usecases/create-category";
import { makeImportCategoryController } from "../../../usecases/import-category";
import { makeListCategoriesController } from "../../../usecases/list-categories";

const categoriesRoutes = Router();

const uploadConfiguration = multer({
    dest: "./tmp",
});

categoriesRoutes.post("/categories", createCategoryValidation, (req, res) =>
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
