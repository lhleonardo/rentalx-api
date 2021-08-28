import { Router } from "express";

import { makeCreateSpecificationController } from "../../../usecases/create-specification/create-specification-factory";
import { makeListSpecificationController } from "../../../usecases/list-specifications/list-specifications-factory";

const specificationsRoutes = Router();

specificationsRoutes.post("/specifications", (req, res) =>
    makeCreateSpecificationController().handle(req, res)
);

specificationsRoutes.get("/specifications", (req, res) =>
    makeListSpecificationController().handle(req, res)
);

export { specificationsRoutes };
