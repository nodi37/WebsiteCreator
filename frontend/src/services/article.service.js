import axios from "axios";
const api = process.env.VUE_APP_API_PATH;

const articleService = {
    methods: {
        getArticleByIdRequest: async function (id) {
            const req = await axios.get(api + "article/get-by-id/" + id);
            return req.data.data;
        },

        getManyArticles: async function (query) {
            const req = await axios.get(api + "article/get-many?" + query);
            return req.data.data;
        },

        saveNewArticleRequest: async function (article) {
            const req = await axios.post(api + "article/add", article, { withCredentials: true });
            return req.data.data;
        },

        updateArticleRequest: async function (article) {
            const req = await axios.patch(`${api}article/edit/${article._id}`, article, { withCredentials: true });
            return req.data.data;
        },

        deleteArticleRequest: async function (articleId) {
            const req = await axios.delete(`${api}article/delete/${articleId}`, { withCredentials: true });
            return req.data;
        },
    }
}

export default articleService;