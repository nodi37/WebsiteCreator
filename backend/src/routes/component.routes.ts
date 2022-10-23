import * as componentController from '../controllers/component.controller';
import express from "express";
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware";
import { validateRequestBody, validateRequestParams } from '../middlewares/requestValidationMiddlewares';
import {
    saveNewCompBodySchema,
    updateCompBodySchema
} from '../validations/componentValidation';
import { idParamSchema } from '../validations/sharedValidations';

router.post('/add',
    checkAuth,
    validateRequestBody(saveNewCompBodySchema),
    componentController.addComponent
);

router.patch('/edit/:id',
    checkAuth,
    validateRequestBody(updateCompBodySchema),
    componentController.editComponent
); //Updates partial

//router.put('/:id', checkAuth, componentController.updateComponent); //Updates entire resource

router.delete('/delete/:id',
    checkAuth,
    validateRequestParams(idParamSchema),
    componentController.deleteComponent
);

router.get('/get/:id',
    validateRequestParams(idParamSchema),
    componentController.getOne
);


//router.get('/get-many', componentController.getMany);


export default router;