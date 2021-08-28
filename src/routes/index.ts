import { Router } from "express";

import { carsRoutes } from "../modules/cars/infra/http/routes";

const routes = Router();

routes.use(carsRoutes);

export { routes };
