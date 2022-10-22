import { Request, Response } from 'express';
import IQueryError from "../interfaces/IQueryError";
import { base64toFile } from '../utils/fs.utils';
import { paths } from '../config/appConfig';

import {
    getOneImage,
    addNewImage,
    getManyImages,
    deleteSingleImage
} from "../services/imageService";

const getOne = async (req: Request, res: Response) => {
    try {
        const response = await getOneImage(req.params.id);

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

const addImage = async (req: Request, res: Response) => {
    try {

        const { isChunked, image, chunkedFile, toFile }: { isChunked: boolean, image: string, chunkedFile: string, toFile: boolean } = req.body;
        const incomingFile = !!isChunked ? chunkedFile : image;

        const data = toFile ? await base64toFile(incomingFile, paths.images) : incomingFile;

        const query = await addNewImage({
            data: data,
            isFile: toFile,
        });

        res.status(200).json({ documentId: query._id });

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

const deleteImage = async (req: Request, res: Response) => {
    try {
        const response = await deleteSingleImage(req.params.id);
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
        const response = await getManyImages(req.query);

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
    getOne,
    addImage,
    getMany,
    deleteImage
}