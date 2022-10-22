///NEEEDS REFACTORING 
//Images are removed on component changes already but its safety feature
//If image will be saved and component will be not due to connection brake or server error, this function will clean unnecessary files
//NEEEDS TO BE EXPANDED FOR galleries/articles and other files than images!!!!


import {
    imagesCleanerActive,
    imagesCleanerIntervalMinutes,
} from "../config/appConfig";
import { Document } from "mongoose";
import IImage from "../interfaces/IImage";

import Component from "../models/Component";
import { getManyImages, deleteSingleImage } from "../services/imageService";

async function startImageCleaner() {
    if (!imagesCleanerActive) return;
    console.log(`[Image Cleaner] Image cleaner is active with ${imagesCleanerIntervalMinutes} minutes interval.`);
    let removedImagesCount = 0;

    setInterval(async () => {
        console.log(`[Image Cleaner] Checking images to clean...`);
        interface IImageDoc extends IImage, Document { };
        const imagesDocs = await getManyImages({}) as [IImageDoc];

        for (const image of imagesDocs) {
            const imgId = image._id.toString();

            const compsWithImg = await Component.aggregate([
                {
                    "$project": {
                        "arr": {
                            "$objectToArray": "$$ROOT.props"
                        }
                    }
                },
                {
                    "$match": {
                        arr: {
                            $elemMatch: {
                                "v": imgId
                            }
                        }
                    }
                },
            ]);

            if (!compsWithImg.length) {
                await deleteSingleImage(imgId);
                console.log(`[Image Cleaner] Image id: ${imgId} is no longer needed and has been removed!`);
                removedImagesCount++;
            };

        }

        console.log(`[Image Cleaner] Cleaning function finished. ${removedImagesCount} images data removed!`);
        removedImagesCount = 0;
    }, imagesCleanerIntervalMinutes * 60000);
}


export default startImageCleaner;