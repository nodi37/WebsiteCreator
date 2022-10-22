import fs from "fs/promises";
import {
    paths,
} from "../../config/appConfig";

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

export default createRequiredCatalogs;