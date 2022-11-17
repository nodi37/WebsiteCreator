import * as ArticleController from '../controllers/article.controller';
import express, { NextFunction, Request, Response } from "express";
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware";
import { validateRequestBody, validateRequestParams, validateRequestQuery } from '../middlewares/requestValidationMiddlewares';
import {
    saveNewArtBodySchema,
    updateArtBodySchema,
    getManyQuerySchema
} from '../validations/articleValidation';
import { idParamSchema } from '../validations/sharedValidations';

router.post('/add',
    checkAuth,
    validateRequestBody(saveNewArtBodySchema),
    ArticleController.addArticle
);

router.patch('/edit/:id',
    checkAuth,
    validateRequestParams(idParamSchema),
    validateRequestBody(updateArtBodySchema),
    ArticleController.editArticle
); //Updates partial

//router.put('/:id', checkAuth, ArticleController.updateArticle); //Updates entire resource

router.delete('/delete/:id',
    checkAuth,
    validateRequestParams(idParamSchema),
    ArticleController.deleteArticle
);

router.get('/get-by-id/:id',
    checkAuthIfNotPublic,
    validateRequestParams(idParamSchema),
    ArticleController.getOneById
);


router.get('/get-many',
    //Auth check if requests all, not public only 
    checkAuthIfNotPublic,
    validateRequestQuery(getManyQuerySchema),
    ArticleController.getMany
);


function checkAuthIfNotPublic(req: Request, res: Response, next: NextFunction) {
    const isPublicBool = req.query.isPublic === "true";
    if (isPublicBool) {
        next();
    } else {
        checkAuth(req, res, next);
    }
}


export default router;