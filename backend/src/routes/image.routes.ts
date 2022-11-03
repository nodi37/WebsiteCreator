import * as imageController from '../controllers/image.controller';
import express from "express";
import chunkingSystem from '../middlewares/chunkingSystem';
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware";
import { validateRequestBody, validateRequestParams, validateRequestQuery } from '../middlewares/requestValidationMiddlewares';
import { idParamSchema } from '../validations/sharedValidations';
import { addImgBodySchema, getImgQuerySchema } from '../validations/imageValidation';

router.get('/get/:id',
    validateRequestParams(idParamSchema),
    validateRequestQuery(getImgQuerySchema),
    imageController.getOne
);

router.post('/add', 
    checkAuth, 
    validateRequestBody(addImgBodySchema),
    chunkingSystem, 
    imageController.addImage
);

router.delete('/delete/:id',
    checkAuth,
    validateRequestParams(idParamSchema),
    imageController.deleteImage
);


//router.patch('/edit/:id', layoutController.editLayout); //Updates partial
//router.put('/:id', layoutController.updateLayout); //Updates entire resource
//router.get('/get-many', layoutController.getMany);


export default router;