import axios from "axios";
const api = process.env.VUE_APP_API_PATH;

const authService = {
    methods: {
        loginRequest: async function (username, password) {
            const req = await axios.post(api + "auth/login", { username: username, password: password }, { withCredentials: true });
            return req.data;
        },

        verifyRequest: async function () {
            const req = await axios.get(api + "auth/verify", { withCredentials: true });
            return req.data;
        },

        logoutRequest: async function () {
            const req = await axios.get(api + "auth/logout", { withCredentials: true });
            return req.data;
        },
    }
}

export default authService;