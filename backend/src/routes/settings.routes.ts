import express from "express";
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware";
import * as settingController from "../controllers/setting.controller";
import { nameParamSchema, settingBodySchema } from "../validations/settingValidation";
import { validateRequestBody, validateRequestParams } from "../middlewares/requestValidationMiddlewares";


router.get('/get-by-name/:name',
    validateRequestParams(nameParamSchema),
    settingController.getByNameController
);

router.patch('/edit-by-name/:name',
    checkAuth,
    validateRequestParams(nameParamSchema),
    validateRequestBody(settingBodySchema),
    settingController.editByNameController
);





export default router;