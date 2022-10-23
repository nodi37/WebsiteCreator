import * as layoutController from '../controllers/layout.controller';
import express from "express";
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware";
import { validateRequestBody, validateRequestParams, validateRequestQuery } from '../middlewares/requestValidationMiddlewares';
import { getManyQuerySchema, nameParamSchema, saveNewLayoutBodySchema, updateLayoutBodySchema } from '../validations/layoutValidation';
import { idParamSchema } from '../validations/sharedValidations';

router.post('/add', 
    checkAuth, 
    validateRequestBody(saveNewLayoutBodySchema),
    layoutController.addLayout
);

router.patch('/edit/:id', 
    checkAuth, 
    validateRequestParams(idParamSchema), 
    validateRequestBody(updateLayoutBodySchema),
    layoutController.editLayout
); //Updates partial

//router.put('/:id', checkAuth, layoutController.updateLayout); //Updates entire resource

router.delete('/delete/:id', 
    checkAuth, 
    validateRequestParams(idParamSchema), 
    layoutController.deleteLayout
);

router.get('/get/:id', 
    validateRequestParams(idParamSchema), 
    layoutController.getOne
);

router.get('/get-many', 
    validateRequestQuery(getManyQuerySchema),
    layoutController.getMany
);

router.get('/get-components/:name', 
    validateRequestParams(nameParamSchema),
    layoutController.getLayoutComponentsByLayoutName
);

export default router;