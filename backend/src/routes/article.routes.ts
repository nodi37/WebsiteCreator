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
    validateRequestBody(saveNewArtBodySchema),
    checkAuth,
    ArticleController.addArticle
);

router.patch('/edit/:id',
    validateRequestParams(idParamSchema),
    validateRequestBody(updateArtBodySchema),
    checkAuth,
    ArticleController.editArticle
); //Updates partial

//router.put('/:id', checkAuth, ArticleController.updateArticle); //Updates entire resource

router.delete('/delete/:id',
    checkAuth,
    validateRequestParams(idParamSchema),
    ArticleController.deleteArticle
);

router.get('/get-by-id/:id',
    validateRequestParams(idParamSchema),
    checkAuthIfNotPublic,
    ArticleController.getOneById
);


router.get('/get-many',
    //Auth check if requests all, not public only 
    validateRequestQuery(getManyQuerySchema),
    checkAuthIfNotPublic,
    ArticleController.getMany
);


function checkAuthIfNotPublic(req: Request, res: Response, next: NextFunction) {
    const isPublic = req.query.isPublic;
    const isPublicBool = isPublic === "true" || !!isPublic;
    if (isPublicBool) {
        next();
    } else {
        checkAuth(req, res, next);
    }
}


export default router;