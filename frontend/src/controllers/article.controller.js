import articleService from "@/services/article.service";

const articleController = {
    methods: {
        getArticleFromServerById: async function (id) {
            const req = await this.getArticleByIdRequest(id)
            return req;
        },

        getArticleFromServerByHref: async function (href) {
            //fix
            const req = await this.getManyArticles(href)
            return req;
        },

        getManyArticlesFromServer: async function (queryObject) {
            let queryString = '';

            for(const key in queryObject) {
                const value = queryObject[key];
                if (value!=null) {
                    queryString += `&${key}=${value}`;
                }
            }

            const req = await this.getManyArticles(queryString);
            return !!req ? req : [];
        },

        updateArticleOnServer: async function (modifiedArticle) {
            const req = await this.updateArticleRequest(modifiedArticle)
            return req;
        },

        saveNewArticleOnServer: async function (article) {
            const newArticleData = await this.saveNewArticleRequest(article);
            return newArticleData;
        },

        deleteArticleFromServer: async function (articleId) {
            return await this.deleteArticleRequest(articleId);
        },
    },
    mixins: [articleService]
}

export default articleController;