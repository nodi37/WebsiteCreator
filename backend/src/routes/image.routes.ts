import * as imageController from '../controllers/image.controller';
import express from "express";
import chunkingSystem from '../middlewares/chunkingSystem';
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware";

router.get('/get/:id', imageController.getOne);
router.post('/add', checkAuth, chunkingSystem, imageController.addImage);
router.delete('/delete/:id', checkAuth, imageController.deleteImage);


//router.patch('/edit/:id', layoutController.editLayout); //Updates partial
//router.put('/:id', layoutController.updateLayout); //Updates entire resource
//router.get('/get-many', layoutController.getMany);


export default router;