import { Request, Response } from 'express';
import IQueryError from "../interfaces/IQueryError";

import {
    saveNewArticle,
    editExistingArticle,
    replaceExistingArticle,
    deleteSingleArticle,
    getOneArticleById,
    getManyArticles
} from "../services/articleService";

const addArticle = async (req: Request, res: Response) => {
    try {
        const response = await saveNewArticle(req.body);
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

const editArticle = async (req: Request, res: Response) => {
    try {
        const response = await editExistingArticle(req.body, req.params.id);

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

const updateArticle = async (req: Request, res: Response) => {
    try {
        const response = await replaceExistingArticle(req.body, req.params.id);
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

const deleteArticle = async (req: Request, res: Response) => {
    try {
        const response = await deleteSingleArticle(req.params.id);
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

const getOneById = async (req: Request, res: Response) => {
    try {
        const response = await getOneArticleById(req.params.id);

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
        const response = await getManyArticles(req.query);

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


export {
    addArticle,
    editArticle,
    updateArticle,
    deleteArticle,
    getOneById,
    getMany
}