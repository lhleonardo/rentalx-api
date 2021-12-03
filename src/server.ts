import express from "express";
import "express-async-errors";
import swagger from "swagger-ui-express";

import "./database";
import { exceptionHandler } from "./middlewares/exception-handler";
import { validationHandler } from "./middlewares/validation-handler";
import { routes } from "./routes";
import swaggerConfig from "./swagger.json";

const app = express();

const port = 3000;

app.use(express.json());
app.use(routes);

app.use("/api-docs", swagger.serve, swagger.setup(swaggerConfig));

app.use(validationHandler);
app.use(exceptionHandler);

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
