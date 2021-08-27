import express from "express";

import "express-async-errors";

import { exceptionHandler } from "./middlewares/exception-handler";
import { routes } from "./routes";

const app = express();

const port = 3000;

app.use(express.json());

app.use(routes);

app.use(exceptionHandler);

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
