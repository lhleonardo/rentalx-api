import { Router } from "express";

import ensureAuthenticated from "../../modules/auth/middlewares/ensure-authenticated";
import { authRoutes } from "../../modules/auth/routes/auth-routes";
import { carsRoutes } from "../../modules/cars/infra/http/routes";
import { usersRoutes } from "../../modules/users/routes/users-routes";

const routes = Router();
// não precisa de autenticação
routes.use(authRoutes);

// rotas autenticadas
routes.use(ensureAuthenticated);
routes.use(carsRoutes);
routes.use(usersRoutes);

export { routes };
