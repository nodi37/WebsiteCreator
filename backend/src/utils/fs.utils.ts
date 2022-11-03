import md5 from "md5";
import fs from 'fs/promises';
import { Buffer } from 'buffer';


//This needs to be refactored for other types of data, this will work for images only

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

function base64toBuffer(b64string: string): { buffer: Buffer, extension: string } {
    const fileData = b64string.split(';base64,');

    const imageType = fileData[0];
    const base64String = fileData[1];

    const extension = imageType.slice(imageType.indexOf('/') + 1);
    const buffer = Buffer.from(base64String, 'base64');

    return { buffer, extension };
}

function bufferToBase64(buffer: Buffer, extension: string): string {
    const b64 = buffer.toString('base64')
    const prefix = `data:image/${extension};base64,`
    return prefix+b64;
}

//END OF = This needs to be refactored for other types of data, this will work for images only


async function deleteFile(path: string): Promise<void> {
    await fs.rm(path);
}

export {
    base64toFile,
    base64toBuffer,
    bufferToBase64,
    deleteFile
};