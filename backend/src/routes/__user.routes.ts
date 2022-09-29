// import express from "express";
// const router = express.Router();
// import * as userController from '../controllers/user.controller';

// // const { validateRequestBody, validateRequestParams, validateRequestQuery } from '../middlewares/requestValidationMiddlewares');
// // const { addUserSchema, editUserSchema, getManyUsersSchema } from '../validations/userValidation');
// // const { idParamSchema } from '../validations/sharedValidations');

// // router.post('/', validateRequestBody(addUserSchema), userController.addUser);
// // router.patch('/:id', validateRequestParams(idParamSchema), validateRequestBody(editUserSchema), userController.editUser); //Updates partial
// // router.put('/:id', validateRequestParams(idParamSchema), validateRequestBody(addUserSchema), userController.updateUser); //Updates entire resource
// // router.delete('/:id', validateRequestParams(idParamSchema), userController.deleteUser);
// // router.get('/:id', validateRequestParams(idParamSchema), userController.getOne);
// // router.get('/', validateRequestQuery(getManyUsersSchema), userController.getMany);

// router.post('/add', userController.addUser);
// router.patch('/edit/:id', userController.editUser); //Updates partial
// //router.put('/:id', userController.updateUser); //Updates entire resource
// router.delete('/delete/:id', userController.deleteUser);
// router.get('/get/:id', userController.getOne);
// router.get('/get-many', userController.getMany);


// export default router;
