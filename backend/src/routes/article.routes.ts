import * as ArticleController from '../controllers/article.controller';
import express from "express";
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware";
import { validateRequestBody, validateRequestParams } from '../middlewares/requestValidationMiddlewares';
import {
    saveNewArtBodySchema,
    updateArtBodySchema
} from '../validations/articleValidation';
import { idParamSchema } from '../validations/sharedValidations';

router.post('/add',
    // checkAuth,
    // validateRequestBody(saveNewArtBodySchema),
    ArticleController.addArticle
);

router.patch('/edit/:id',
    // checkAuth,
    // validateRequestBody(updateArtBodySchema),
    ArticleController.editArticle
); //Updates partial

//router.put('/:id', checkAuth, ArticleController.updateArticle); //Updates entire resource

router.delete('/delete/:id',
    // checkAuth,
    // validateRequestParams(idParamSchema),
    ArticleController.deleteArticle
);

router.get('/get-by-id/:id',
    // validateRequestParams(idParamSchema),
    ArticleController.getOneById
);


router.get('/get-many',
    //Auth check if requests all, not public only 
    // (req, res, next) => {
    //     const isPublicBool = req.query.isPublic === "true";
    //     if (isPublicBool) {
    //         next();
    //     } else {
    //         checkAuth(req, res, next);
    //     }
    // },
    ArticleController.getMany
);


export default router;