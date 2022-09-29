import { createCanvas, Image } from "canvas";

function resizeImage(imageBase64: string, width: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const img = new Image();
        img.src = imageBase64;

        img.onload = () => {
            if (width > img.width || !width) {
                resolve(imageBase64);
            } else {
                const asRatio = parseFloat((img.width / img.height).toFixed(2));
                const height = width / asRatio;

                const canvas = createCanvas(width, height)
                const ctx = canvas.getContext('2d');

                ctx!.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', 1);
                resolve(dataUrl);
            }
        };


    });
}

export default resizeImage;
