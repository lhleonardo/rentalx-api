import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

const carsRoutes = Router();

carsRoutes.use(categoriesRoutes);
carsRoutes.use(specificationsRoutes);

export { carsRoutes };
