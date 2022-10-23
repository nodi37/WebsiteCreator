import * as authController from '../controllers/auth.controller';
import express from "express";
const router = express.Router();

import checkAuth from "../middlewares/authMiddleware";
import { validateRequestBody } from '../middlewares/requestValidationMiddlewares';
import { loginSchema } from '../validations/authValidation';

router.post('/login', validateRequestBody(loginSchema), authController.login);
router.get('/logout', checkAuth, authController.logout);
router.get('/verify', checkAuth, authController.verify);
//router.post('/reset-password', authController.resetPassword); 


export default router;
