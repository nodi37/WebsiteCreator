import ArticleService from "@/services/article.service";
import imageController from "./image.controller";

const ArticleController = {
    methods: {
        getArticleModel: function (name) {
            return this.ArticlesModels.find((doc) => doc.name === name);
        },

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
            const req = await this.updateArticleRequest(newArticle)
            return req;
        },

        saveArticleOnServer: async function (article) {
            //Fix
            const newArticleData = await this.saveNewArticleRequest(article);
            return newArticleData;
        },

        deleteArticleWithDataFromServer: async function (article) {
            for (const imgId of article.galleryImgs) {
                console.log(imgId)
                // const imgId = Article.props[imgProp.name];
                // if (!!imgId) this.deleteImage(imgId)
            }

            return await this.deleteArticleRequest(Article);
        },
    },
    mixins: [ArticleService, imageController, createPropsObj]
}

export default ArticleController;