import axios from "axios";
const api = process.env.VUE_APP_API_PATH;

const componentService = {
    methods: {
        getComponentByIdRequest: async function (id) {
            const req = await axios.get(api + "component/get/" + id);
            return req.data.data;
        },

        saveNewComponentRequest: async function (component) {
            const req = await axios.post(api + "component/add", component, {withCredentials: true});
            return req.data.data;
        },

        updateComponentRequest: async function (component) {
            const req = await axios.patch(`${api}component/edit/${component._id}`, component, {withCredentials: true});
            return req.data.data;
        },

        deleteComponentRequest: async function (component) {
            const req = await axios.delete(`${api}component/delete/${component._id}`, {withCredentials: true});
            return req.data;
        },
    }
}

export default componentService;