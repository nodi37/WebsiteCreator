import axios from 'axios'
const api = process.env.VUE_APP_API_PATH;

const layoutService = {
    methods: {
        loadLayoutByNameRequest: async function (name) {
            const request = await axios.get(`${api}layout/get-many?name=${name}`);
            return request.data.data[0]
        },

        loadLayoutComponentsByLayoutNameRequest: async (layoutName) => {
            const request = await axios.get(`${api}layout-components/get-by-name/${layoutName}`);
            return request.data.data || [];
        },

        updateLayoutRequest: async function (layoutDoc) {
            const req = await axios.patch(`${api}layout/edit/${layoutDoc._id}`, layoutDoc);
            return req.data.data;
        },
    }
}

export default layoutService;