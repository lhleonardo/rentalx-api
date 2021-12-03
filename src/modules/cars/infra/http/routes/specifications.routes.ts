import { Router } from "express";

import {
    createSpecificationValidation,
    makeCreateSpecificationController,
} from "../../../usecases/create-specification";
import { makeListSpecificationController } from "../../../usecases/list-specifications";

const specificationsRoutes = Router();

specificationsRoutes.post(
    "/specifications",
    createSpecificationValidation,
    (req, res) => makeCreateSpecificationController().handle(req, res)
);

specificationsRoutes.get("/specifications", (req, res) =>
    makeListSpecificationController().handle(req, res)
);

export { specificationsRoutes };
