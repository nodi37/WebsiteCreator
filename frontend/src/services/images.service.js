import axios from 'axios';
const api = process.env.VUE_APP_API_PATH;

const imageService = {
    methods: {
        getImageRequest: async function (imageId, size) {
            const sizeQuery = !size ? '' : `?size=${size}`;
            const request = await axios.get(api + "image/get/" + imageId + sizeQuery);
            return request.data.data ? request.data.data : null;
        },

        saveNewImageRequest: async function (base64string, toFile) {
            const response = await axios.post(api + 'image/add', {
                isChunked: false,
                image: base64string,
                toFile: toFile
            }, { withCredentials: true });
            return response.data;
        },

        deleteImageRequest: async function (imageId) {
            const request = await axios.delete(`${api}image/delete/${imageId}`, { withCredentials: true });
            return request.data.data ? request.data.data : null;
        },
    }
}


export default imageService