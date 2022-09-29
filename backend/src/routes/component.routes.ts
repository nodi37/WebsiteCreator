import * as componentController from '../controllers/component.controller';
import express from "express";
const router = express.Router();

router.post('/add', componentController.addComponent);
router.patch('/edit/:id', componentController.editComponent); //Updates partial
router.put('/:id', componentController.updateComponent); //Updates entire resource
router.delete('/delete/:id', componentController.deleteComponent);
router.get('/get/:id', componentController.getOne);
//router.get('/get-many', componentController.getMany);


export default router;