import md5 from "md5";
import fs from 'fs/promises';
import { Buffer } from 'buffer';

async function base64toFile(b64string: string, path: string): Promise<string> {
    const fileData = b64string.split(';base64,');
    const now = new Date().getTime();

    const imageType = fileData[0];
    const base64String = fileData[1];

    const extension = imageType.slice(imageType.indexOf('/')).replace('/', '.');
    const buffer = Buffer.from(base64String, 'base64');

    const fileName = md5(b64string + now);
    const completePath = path + fileName + extension;

    await fs.writeFile(completePath, buffer);
    return completePath;
}

async function deleteFile(path: string): Promise<void> {
    await fs.rm(path);
}

export {
    base64toFile,
    deleteFile
};