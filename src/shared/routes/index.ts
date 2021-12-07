import { Router } from "express";

import { authRoutes } from "../../modules/auth/routes/auth-routes";
import { carsRoutes } from "../../modules/cars/infra/http/routes";
import { usersRoutes } from "../../modules/users/routes/users-routes";

const routes = Router();

routes.use(carsRoutes);
routes.use(usersRoutes);
routes.use(authRoutes);

export { routes };
