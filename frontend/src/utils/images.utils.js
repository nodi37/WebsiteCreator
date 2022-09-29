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

                        const dataUrl = canvas.toDataURL('image/' + imageFormat, 1);
                        resolve(dataUrl);
                    }
                });

                reader.readAsDataURL(imageFile);
            });
        }
    }
}

export default imageUtils;
