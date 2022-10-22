import * as layoutController from '../controllers/layout.controller';
import express from "express";
const router = express.Router();
import checkAuth from "../middlewares/authMiddleware";

router.post('/add', checkAuth, layoutController.addLayout);
router.patch('/edit/:id', checkAuth, layoutController.editLayout); //Updates partial
router.put('/:id', checkAuth, layoutController.updateLayout); //Updates entire resource
router.delete('/delete/:id', checkAuth, layoutController.deleteLayout);
router.get('/get/:id', layoutController.getOne);
router.get('/get-many', layoutController.getMany);


export default router;