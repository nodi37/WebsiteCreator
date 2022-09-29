// import { Request, Response } from 'express';
// import IQueryError from "../interfaces/IQueryError";
// import {
//     saveNewUser,
//     editExistingUser,
//     replaceExistingUser,
//     deleteSingleUser,
//     getOneUser,
//     getManyUsers
// } from "../services/userService";

// const addUser = async (req: Request, res: Response) => {
//     try {
//         const response = await saveNewUser(req.body);
//         res.status(201).json({ data: response });
//     } catch (error) {
//         const err = error as IQueryError
//         if (err.code != 11000) {
//             console.log(error);
//         }
//         if (err.code === 11000) {
//             res.status(409).json({ error: "Conflict" });
//         } else {
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     }
// }

// const editUser = async (req: Request, res: Response) => {
//     try {
//         const response = await editExistingUser(req.body, req.params.id);

//         if (response) {
//             res.status(201).json({ data: response });
//         } else {
//             res.status(404).json({ error: "Resource not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// const updateUser = async (req: Request, res: Response) => {
//     try {
//         const response = await replaceExistingUser(req.body, req.params.id);
//         if (response) {
//             res.status(201).json({ data: response });
//         } else {
//             res.status(404).json({ error: "Resource not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// const deleteUser = async (req: Request, res: Response) => {
//     try {
//         const response = await deleteSingleUser(req.params.id);
//         if (response) {
//             res.status(200).json({ data: response });
//         } else {
//             res.status(404).json({ error: "Resource not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// const getOne = async (req: Request, res: Response) => {
//     try {
//         const response = await getOneUser(req.params.id);

//         if (response) {
//             res.status(200).json({ data: response });
//         } else {
//             res.status(404).json({ error: "Resource not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// const getMany = async (req: Request, res: Response) => {
//     try {
//         const response = await getManyUsers(req.query);

//         if (!!response && response.length > 0) {
//             res.status(200).json({ data: response });
//         } else {
//             res.status(204).json({ error: "No content" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }


// export {
//     addUser,
//     editUser,
//     updateUser,
//     deleteUser,
//     getOne,
//     getMany
// }