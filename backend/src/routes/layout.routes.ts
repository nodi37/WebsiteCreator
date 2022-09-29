import * as layoutController from '../controllers/layout.controller';
import express from "express";
const router = express.Router();

router.post('/add', layoutController.addLayout);
router.patch('/edit/:id', layoutController.editLayout); //Updates partial
router.put('/:id', layoutController.updateLayout); //Updates entire resource
router.delete('/delete/:id', layoutController.deleteLayout);
router.get('/get/:id', layoutController.getOne);
router.get('/get-many', layoutController.getMany);


export default router;