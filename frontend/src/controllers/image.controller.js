import chunkingSystem from "@/utils/chunking.utils";
import imageService from "@/services/images.service";

const imageController = {
    methods: {
        getImageById: async function (id, size) {
            return await this.getImageRequest(id, size);
        },

        uploadImage: async function (imageBase64, toFile) {
            let imageId = '';

            //chunking system
            const chunks = this.chunkString(imageBase64);
            if (chunks.length > 1) {
                const response = await this.sendChunks(chunks, 'image/add', { isChunked: true, toFile: toFile });
                imageId = response.data.documentId;
            } else { //regular image upload
                const response = await this.saveNewImageRequest(imageBase64, toFile);
                imageId = response.documentId;
            }
            return imageId;
        },

        deleteImage: async function (imageId) {
            return await this.deleteImageRequest(imageId);
        }
    },
    mixins: [chunkingSystem, imageService]
}

export default imageController;