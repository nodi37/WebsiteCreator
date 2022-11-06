import { Request, Response } from 'express';
import IQueryError from "../interfaces/IQueryError";
import { base64toFile } from '../utils/fs.utils';
import { paths } from '../config/appConfig';

import {
    getOneImage,
    addNewImage,
    //getManyImages,
    deleteSingleImage
} from "../services/imageService";
import resizeImage from '../utils/image.utils';
import { IImageDoc } from '../interfaces/IImage';
import { imagesWidth } from '../config/imagesRouteConfig';

const imageSizes = {
    mini: imagesWidth.mini,
    medium: imagesWidth.medium,
    large: imagesWidth.large,
    xlarge: imagesWidth.xlarge
}

const getOne = async (req: Request, res: Response) => {
    try {

        const sizeParam = req.query.size as keyof typeof imageSizes;
        const imageDoc = await getOneImage(req.params.id) as unknown as IImageDoc; //I should fix types

        if (imageDoc) {
            const imgData = !sizeParam? imageDoc.data : imageDoc.converted[sizeParam]
            res.status(200).json({ data: { _id: imageDoc._id, isFile: imageDoc.isFile, data: imgData } });

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

        const orignalImage = toFile ? await base64toFile(incomingFile, paths.images) : incomingFile;

        let convertedImgs = {
            mini: '',
            medium: '',
            large: '',
            xlarge: ''
        };

        //Converting images
        for (const size in imageSizes) {
            const index = size as keyof typeof imageSizes;
            const data = await resizeImage(incomingFile, imageSizes[index]);
            convertedImgs[index] = data;
        }

        if (toFile) {
            for (const img in convertedImgs) {
                const index = img as keyof typeof imageSizes;
                const path = await base64toFile(convertedImgs[index], paths.images)
                convertedImgs[index] = path;
            }
        }

        //Adding image to DB
        const query = await addNewImage({
            data: orignalImage,
            converted: convertedImgs,
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

// const getMany = async (req: Request, res: Response) => {
//     try {
//         const response = await getManyImages(req.query);

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
    getOne,
    addImage,
    //getMany,
    deleteImage
}