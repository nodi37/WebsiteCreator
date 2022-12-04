import express from "express";
const router = express.Router();
import * as statisticsController from "../controllers/statistics.controller";
import { nameParamSchema } from "../validations/settingValidation";
import { validateRequestParams } from "../middlewares/requestValidationMiddlewares";


router.get('/get-by-name/:name',
    validateRequestParams(nameParamSchema),
    statisticsController.getByNameController
);

router.get('/increase/:name',
    validateRequestParams(nameParamSchema),
    statisticsController.increaseByNameController
);

// router.patch('/edit-by-name/:name',
//     validateRequestParams(nameParamSchema),
//     validateRequestBody(statisticBodySchema),
//     statisticController.editByNameController
// );


export default router;