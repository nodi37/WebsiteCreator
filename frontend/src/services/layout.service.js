import axios from 'axios'
const api = process.env.VUE_APP_API_PATH;

const layoutService = {
    methods: {
        getManyLayoutsRequest: async function () {
            //this needs to be prepared to use skip/limit/etc if needed!
            const request = await axios.get(`${api}layout/get-many`);
            return request.data.data ? request.data.data : [];
        },

        addNewLayoutRequest: async function (name) {
            const request = await axios.post(`${api}layout/add`, { name: name }, {withCredentials: true});
            return request.data.data ? request.data.data : null;
        },
        loadLayoutByNameRequest: async function (name) {
            const request = await axios.get(`${api}layout/get-many?name=${name}`, {withCredentials: true});
            return request.data.data ? request.data.data[0] : null;
        },

        loadLayoutComponentsByLayoutNameRequest: async (layoutName) => {
            const request = await axios.get(`${api}layout-components/get-by-name/${layoutName}`);
            return request.data.data ? request.data.data : [];
        },

        updateLayoutRequest: async function (layoutDoc) {
            const request = await axios.patch(`${api}layout/edit/${layoutDoc._id}`, layoutDoc, {withCredentials: true});
            return request.data.data ? request.data.data : null;
        },

        deleteLayoutRequest: async function (layoutDoc) {
            const request = await axios.delete(`${api}layout/delete/${layoutDoc._id}`, {withCredentials: true});
            return request.data.data ? request.data.data : null;
        },
    }
}

export default layoutService;