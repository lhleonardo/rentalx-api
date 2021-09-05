import "express-async-errors";
import express from "express";
import swagger from "swagger-ui-express";

import { exceptionHandler } from "./middlewares/exception-handler";
import { routes } from "./routes";
import swaggerConfig from "./swagger.json";

const app = express();

const port = 3000;

app.use(express.json());
app.use(routes);

app.use("/api-docs", swagger.serve, swagger.setup(swaggerConfig));

app.use(exceptionHandler);

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
