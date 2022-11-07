import tasksStateUtils from "@/utils/task.state.utils";
import imageUtils from "@/utils/images.utils";
import imageController from "@/controllers/image.controller";
import articleController from "@/controllers/article.controller";
import * as config from "@/configs/articleConfig";

const articleManagement = {
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
            isLoading: true,
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
            const articleData = await this.getArticleFromServerById(this.articleDocId);

            this.articleModel = {
                ...articleData,
                userDate: this.createDateInputString(new Date(articleData.userDate)),
            }

        },

        saveArticleHandler: async function () {
            this.isLoading = true;

            this.setTasksState('taskState', 1, 4, 'saving-images', true);
            await this.presendImages(this.imgFilesArr);

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

        updateArticleHandler: async function () {
            // this.isLoading = true;

            // this.setTasksState('taskState', 1, 4, 'saving-images', true);
            // await this.presendImages();

            // this.setTasksState('taskState', 2, 4, 'preparing-props', true);

            // if (this.articleModel.userDate.length < 10) {
            //     this.articleModel.userDate = this.createDate();
            // }
            // this.articleModel.href = this.createHref();

            // this.setTasksState('taskState', 3, 4, 'saving-document', true);

            // const response = await this.saveNewArticleOnServer({
            //     ...this.articleModel,
            //     mainImageId: this.articleModel.galleryImgs[0],
            //     userDate: new Date(this.articleModel.userDate),
            //     createDate: new Date(),
            // });

            // this.setTasksState('taskState', 4, 4, 'finished', false);

            // return response;
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
            }).replaceAll('/', '\\');
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

export default articleManagement;