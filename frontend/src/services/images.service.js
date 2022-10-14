import axios from 'axios';
const api = process.env.VUE_APP_API_PATH;

const imageService = {
    methods: {
        saveNewImageOnServer: async function (base64string, toFile) {
            const response = await axios.post(api + 'image/add', {
                isChunked: false,
                image: base64string,
                toFile: toFile
            });
            return response.data;
        },
        
        deleteImageRequest: async function (imageId) {
            const request = await axios.delete(`${api}image/delete/${imageId}`);
            return request.data.data ? request.data.data : null;
        },
    }
}


export default imageService