import express from "express";
import "express-async-errors";
import swagger from "swagger-ui-express";

import "./shared/database";
import { exceptionHandler } from "./shared/middlewares/exception-handler";
import { validationHandler } from "./shared/middlewares/validation-handler";
import { routes } from "./shared/routes";
import swaggerConfig from "./swagger.json";

const app = express();

const port = 3000;

app.use(express.json());
app.use(routes);

app.use("/api-docs", swagger.serve, swagger.setup(swaggerConfig));

app.use(validationHandler);
app.use(exceptionHandler);

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
