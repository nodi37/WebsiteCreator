import * as authController from '../controllers/auth.controller';
import express from "express";
const router = express.Router();

import checkAuth from "../middlewares/authMiddleware";

router.post('/login', authController.login);
router.get('/logout', checkAuth, authController.logout);
router.get('/verify', checkAuth, authController.verify);
//router.post('/reset-password', authController.resetPassword); 


export default router;
