import * as componentController from '../controllers/component.controller';
import express from "express";
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware";

router.post('/add', checkAuth, componentController.addComponent);
router.patch('/edit/:id', checkAuth, componentController.editComponent); //Updates partial
router.put('/:id', checkAuth, componentController.updateComponent); //Updates entire resource
router.delete('/delete/:id', checkAuth, componentController.deleteComponent);
router.get('/get/:id', componentController.getOne);
//router.get('/get-many', componentController.getMany);


export default router;