import axios from "axios";
const api = process.env.VUE_APP_API_PATH;

const statsService = {
    methods: {
        getStatByNameRequest: async function (name) {
            const req = await axios.get(api + "statistic/get-by-name/" + name);
            return req.data.data;
        },

        incStatRequest: async function (name) {
            const req = await axios.get(`${api}statistic/increase/${name}`);
            return req.data.data;
        },
    }
}

export default statsService;