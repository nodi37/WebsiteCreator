import * as imageController from '../controllers/image.controller';
import express from "express";
import chunkingSystem from '../middlewares/chunkingSystem';
const router = express.Router();

router.post('/add', chunkingSystem, imageController.addImage);
//router.patch('/edit/:id', layoutController.editLayout); //Updates partial
//router.put('/:id', layoutController.updateLayout); //Updates entire resource

router.delete('/delete/:id', imageController.deleteImage);

// router.get('/get/:id', imageController.getOne);


//router.get('/get-many', layoutController.getMany);


export default router;