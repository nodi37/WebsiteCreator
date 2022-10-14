const imageUtils = {
    methods: {
        resizeImage: function (imageFile, width, imageFormat) {
            return new Promise(async (resolve, reject) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const reader = new FileReader();
                const img = new Image();

                reader.addEventListener('load', () => {
                    img.src = reader.result;
                });

                img.addEventListener('load', () => {
                    if (width > img.width || !width) {
                        resolve(reader.result);
                    } else {
                        const asRatio = parseFloat((img.width / img.height).toFixed(2));
                        const height = width / asRatio;

                        canvas.width = width;
                        canvas.height = height;

                        ctx.drawImage(img, 0, 0, width, height);

                        //Sometimes large images has bigger size after resizing to smaller size, i need to fix this somehow in the future

                        //Anyway all files bigger than 6mb(6144kb) will be compressed
                        //I think this should cause that all images on server will be not bigger than 2-3mb
                        //Inf - MongoDB has limit of 16mb for document so files bigger than 16mb needs to be compressed anyway
                        const targetQuality = (imageFile.size>6144)?0.8:1;

                        const dataUrl = canvas.toDataURL('image/' + imageFormat, targetQuality);
                        resolve(dataUrl);
                    }
                });

                reader.readAsDataURL(imageFile);
            });
        }
    }
}

export default imageUtils;
