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

        updateArticleOnServer: async function (modifiedArticle) {
            //Fix
            const req = await this.updateArticleRequest(modifiedArticle)
            return req;
        },

        saveNewArticleOnServer: async function (article) {
            //Fix
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