import axios from "axios";
const api = process.env.VUE_APP_API_PATH;

const componentService = {
    methods: {
        saveNewComponentRequest: async function (component) {
            const req = await axios.post(api + "component/add", component);
            return req.data.data;
        },

        updateComponentRequest: async function (component) {
            const req = await axios.patch(`${api}component/edit/${component._id}`, component);
            return req.data.data;
        },

        deleteComponentRequest: async function (component) {
            const req = await axios.delete(`${api}component/delete/${component._id}`);
            return req.data;
        },
    }
}

export default componentService;