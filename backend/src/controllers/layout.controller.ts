import { Request, Response } from 'express';
import IQueryError from "../interfaces/IQueryError";

import {
    saveNewLayout,
    editExistingLayout,
    replaceExistingLayout,
    deleteSingleLayout,
    getOneLayout,
    getManyLayouts,
    getPopulatedLayoutByName
} from "../services/layoutService";

const addLayout = async (req: Request, res: Response) => {
    try {
        const response = await saveNewLayout(req.body);
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

const editLayout = async (req: Request, res: Response) => {
    try {
        const response = await editExistingLayout(req.body, req.params.id);

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

const updateLayout = async (req: Request, res: Response) => {
    try {
        const response = await replaceExistingLayout(req.body, req.params.id);
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

const deleteLayout = async (req: Request, res: Response) => {
    try {
        const response = await deleteSingleLayout(req.params.id);
        if (response) {
            res.status(200).json({ data: response });
            //Delete all components related
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
        const response = await getOneLayout(req.params.id);

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

const getMany = async (req: Request, res: Response) => {
    try {
        const response = await getManyLayouts(req.query);

        if (!!response && response.length > 0) {
            res.status(200).json({ data: response });
        } else {
            res.status(204).json({ error: "No content" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getLayoutComponentsByLayoutName = async (req: Request, res: Response) => {
    try {
        const response = await getPopulatedLayoutByName(req.params.name);

        if (!!response && response.length > 0 && response[0].components.length > 0) {
            res.status(200).json({ data: response[0].components });
        } else {
            res.status(204).json({ error: "No content" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export {
    addLayout,
    editLayout,
    updateLayout,
    deleteLayout,
    getOne,
    getMany,
    getLayoutComponentsByLayoutName
}