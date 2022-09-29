import { Request, Response } from 'express';
import IQueryError from "../interfaces/IQueryError";

import {
    saveNewComponent,
    editExistingComponent,
    replaceExistingComponent,
    deleteSingleComponent,
    getOneComponent,
    //getManyComponents
} from "../services/componentService";

const addComponent = async (req: Request, res: Response) => {
    try {
        const response = await saveNewComponent(req.body);
        res.status(201).json({ data: response });
    } catch (error) {
        const err = error as IQueryError
        if (err.code != 11000) {
            console.log(error);
        }
        if (err.code === 11000) {
            res.status(409).json({ error: "Conflict" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

const editComponent = async (req: Request, res: Response) => {
    try {
        const response = await editExistingComponent(req.body, req.params.id);

        if (response) {
            res.status(200).json({ data: response });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateComponent = async (req: Request, res: Response) => {
    try {
        const response = await replaceExistingComponent(req.body, req.params.id);
        if (response) {
            res.status(200).json({ data: response });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteComponent = async (req: Request, res: Response) => {
    try {
        const response = await deleteSingleComponent(req.params.id);
        if (response) {
            //res.status(200).json({ data: response });
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getOne = async (req: Request, res: Response) => {
    try {
        const response = await getOneComponent(req.params.id);

        if (response) {
            res.status(200).json({ data: response });
        } else {
            res.status(404).json({ error: "Resource not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// const getMany = async (req: Request, res: Response) => {
//     try {
//         const response = await getManyComponents(req.query);

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


export {
    addComponent,
    editComponent,
    updateComponent,
    deleteComponent,
    getOne,
    //getMany
}