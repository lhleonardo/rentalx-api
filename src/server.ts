import express from "express";
import "express-async-errors";
import path from "path";
import swagger from "swagger-ui-express";

import "./shared/database";
import { exceptionHandler } from "./shared/middlewares/exception-handler";
import { validationHandler } from "./shared/middlewares/validation-handler";
import { routes } from "./shared/routes";
import swaggerConfig from "./swagger.json";

const app = express();

const port = 3000;

app.use((req, res, next) => {
    const { protocol } = req;
    const host = req.hostname;
    const url = req.originalUrl;
    const port = process.env.PORT || 3000;

    const fullUrl = `${protocol}://${host}:${port}${url}`;

    console.log(`URL: ${fullUrl}`);

    return next();
});

app.use(express.json());
app.use(routes);

app.use("/api-docs", swagger.serve, swagger.setup(swaggerConfig));

app.use(validationHandler);
app.use(exceptionHandler);

app.use(
    "/uploads",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
