import tasksStateUtils from "@/utils/task.state.utils";
import imageUtils from "@/utils/images.utils";
import imageController from "@/controllers/image.controller";
import articleController from "@/controllers/article.controller";
import * as config from "@/configs/articleConfig";

const articleManager = {
    data: function () {
        return {
            articleDocId: "",
            articleImgsMiniatures: [],
            articleModel: {
                mainImageId: "",
                name: "",
                content: "",
                href: "",
                userDate: "",
                createDate: "",
                galleryImgs: [],
                tags: [],
                isPublic: false,
            },

            //Management states
            nameError: false,
            isLoading: false,
            isError: false,

            //Tasks state
            taskInProgress: false,
            taskState: {
                current: 0,
                count: 0,
                text: ''
            },
            imageUploadState: {
                current: 0,
                count: 0
            }
        };
    },

    methods: {
        //Complex functions
        loadArticleByIdHandler: async function () {
            this.isLoading = true;

            const articleData = await this.getArticleFromServerById(this.articleDocId);

            this.articleModel = {
                ...articleData,
                userDate: this.createDateInputString(new Date(articleData.userDate)),
            }

            this.isLoading = false;
        },

        saveArticleHandler: async function (imgsArr) {
            this.isLoading = true;

            this.setTasksState('taskState', 1, 4, 'saving-images', true);
            await this.presendImages(imgsArr);

            this.setTasksState('taskState', 2, 4, 'preparing-props', true);

            if (this.articleModel.userDate.length < 10) {
                this.articleModel.userDate = this.createDateInputString(new Date());
            }
            this.articleModel.href = this.createHref();

            this.setTasksState('taskState', 3, 4, 'saving-document', true);

            const response = await this.saveNewArticleOnServer({
                ...this.articleModel,
                mainImageId: this.articleModel.galleryImgs[0],
                userDate: new Date(this.articleModel.userDate),
                createDate: new Date(),
            });

            this.articleDocId = response._id;

            this.setTasksState('taskState', 4, 4, 'finished', false);
            this.isLoading = false;
            return response;
        },

        updateArticleHandler: async function (imgsArr) {
            this.isLoading = true;

            this.setTasksState('taskState', 1, 3, 'saving-images', true);
            await this.presendImages(imgsArr);

            this.setTasksState('taskState', 2, 3, 'saving-document', true);

            this.articleModel.href = this.createHref();
            const response = await this.updateArticleRequest({
                _id: this.articleDocId,
                userDate: new Date(this.articleModel.userDate),
                mainImageId: !this.articleModel.imageId ? this.articleModel.galleryImgs[0] : this.articleModel.imageId,
                ...this.articleModel,
            });

            this.setTasksState('taskState', 3, 3, 'finished', false);

            this.isLoading = false;
            return response;
        },

        deleteArticleHandler: async function () {
            this.isLoading = true;

            this.setTasksState('taskState', 1, 2, 'deleting-article', true);

            for (const imgId of this.articleModel.galleryImgs) {
                await this.deleteImage(imgId);
            }

            await this.deleteArticleFromServer(this.articleDocId);

            this.setTasksState('taskState', 2, 2, 'finished', false);
            this.isLoading = false;

            return true;
        },

        deleteImageHandler: async function (imgId) {
            this.isLoading = true;

            await this.deleteImage(imgId);

            const imgIndex = this.articleModel.galleryImgs.indexOf(imgId);
            this.articleModel.galleryImgs.splice(imgIndex, 1);

            this.updateArticleHandler([]);

            this.isLoading = false;
        },

        setMainImageHandler: async function (imgId) {
            this.isLoading = true;

            this.articleModel.mainImageId = imgId;

            this.updateArticleHandler([]);

            this.isLoading = false;
        },

        //help funcs 
        presendImages: async function (filesArr) {
            this.imageUploadState.count = filesArr.length;

            let i = 1;
            for (const img of filesArr) {
                this.imageUploadState.current = i;

                const b64 = await this.resizeImage(img, config.imagesWidthPx);
                const newId = await this.uploadImage(b64);
                this.articleModel.galleryImgs.push(newId);

                i++;
            }
            return;
        },

        createHref() {
            return this.articleModel.userDate + "/" + this.articleModel.name.toLowerCase().replaceAll(' ', '-').slice(0, 30);
        },

        createDateInputString(date) {
            return date.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        }
    },

    watch: {
        articleDocId() {
            this.loadArticleByIdHandler();
        }
    },

    mixins: [
        tasksStateUtils,
        imageUtils,
        imageController,
        articleController,
        imageUtils
    ],
}

export default articleManager;