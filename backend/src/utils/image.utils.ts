import sharp, { FormatEnum } from 'sharp'
import { base64toBuffer, bufferToBase64 } from './fs.utils';

async function resizeImage(imageBase64: string, width: number): Promise<string> {
    const { buffer, extension } = base64toBuffer(imageBase64);
    const imgData = await sharp(buffer).resize(width).toFormat(extension as keyof FormatEnum).toBuffer();
    const base64string = bufferToBase64(imgData, extension);
    return base64string;
}

export default resizeImage;
