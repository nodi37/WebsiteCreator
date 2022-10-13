import fs from "fs/promises";

import {
    paths,
    chunkingBufferCleanerActive,
    chunkingBufferCleanerIntervalMinutes,
    chunkingBufferTimeoutMinutes,
    imagesCleanerActive,
    imagesCleanerIntervalMinutes,
} from "../config/appConfig";

import IImage from "../interfaces/IImage";
import { Document } from "mongoose";

import Layout from "../models/Layout";

import { saveNewLayout } from "../services/layoutService";
import { clearChunkingBuffer } from "../middlewares/chunkingSystem";
import { getManyImages, deleteSingleImage } from "../services/imageService";
import Component from "../models/Component";



function initApp() {
    firstRunLayoutsCreator();
    createRequiredCatalogs();
}

async function firstRunLayoutsCreator() {
    try {
        const topLayout = await Layout.countDocuments({ name: "topLayout" });
        
        if (!topLayout) {
            console.log('[AppInit] Basic layouts data not exists! Creating...');
            await saveNewLayout({
                name: "topLayout",
                components: [],
                isGlobal: true,
                isRequired: true
            });

            await saveNewLayout({
                name: "bottomLayout",
                components: [],
                isGlobal: true,
                isRequired: true
            });

            await saveNewLayout({
                name: "homeLayout",
                components: [],
                isGlobal: false,
                isRequired: true
            });

            console.log("[AppInit] Basic layouts data created!");
        }
    } catch (error) {
        console.log("[AppInit] Error saving basic settings");
        console.log(error)
    }
}

async function createRequiredCatalogs() {

    const pathsArr = paths as { [key: string]: string };

    try {
        for (const path in pathsArr) {
            try {
                await fs.access(pathsArr[path]);
            } catch (error) {
                console.log(`[AppInit] Path: "${path}" can't be accessed! Trying to create...`);
                await fs.mkdir(pathsArr[path], { recursive: true });
                console.log(`[AppInit] Path: "${path}" created!`);
            }
        }
    } catch (error) {
        console.log(`[AppInit] Error when creating required catalogs! Check createRequiredCatalogs func in appInit!`);
        console.log(error);
    }
}

///Interval functions 
function startChunkingBufferCleaner() {
    if (!chunkingBufferCleanerActive) return;
    setInterval(() => clearChunkingBuffer(chunkingBufferTimeoutMinutes), chunkingBufferCleanerIntervalMinutes * 60000);
    console.log('[Chunking buffer] Chunking buffer cleaner started with ' + chunkingBufferCleanerIntervalMinutes + ' minutes interval.');
}



///NEEEDS REFACTORING
//Probably not needeed already, images are removed togheder with components
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


export {
    initApp,
    startChunkingBufferCleaner,
    startImageCleaner
}