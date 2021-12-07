import { Router } from "express";

import { carsRoutes } from "../../modules/cars/infra/http/routes";
import { usersRoutes } from "../../modules/users/routes/users-routes";

const routes = Router();

routes.use(carsRoutes);
routes.use(usersRoutes);

export { routes };
