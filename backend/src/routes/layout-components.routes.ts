import { getLayoutComponentsByLayoutName } from '../controllers/layout.controller';
import express from "express";
const router = express.Router();

router.get('/get-by-name/:name', getLayoutComponentsByLayoutName);

export default router;