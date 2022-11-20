import axios from "axios";
const api = process.env.VUE_APP_API_PATH;

const settingService = {
    methods: {
        getSettingByNameRequest: async function (name) {
            const req = await axios.get(api + "setting/get-by-name/" + name);
            return req.data.data;
        },

        updateSettingRequest: async function (setting) {
            const req = await axios.patch(`${api}setting/edit-by-name/${setting.name}`, setting, {withCredentials: true});
            return req.data.data;
        },
    }
}

export default settingService;