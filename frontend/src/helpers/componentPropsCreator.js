import imageController from "@/controllers/image.controller";

const componentPropsCreator = {
    data: function () {
        return {
            taskInProgress: false,
            imageUploadState: {
                current: 0,
                count: 0,
                text: ''
            },
        };
    },
    methods: {
        createPropsObj: async function (componentDoc, isGlobal) {
            
            const model = this.getComponentModel(componentDoc.name);
            const entries = new Map();

            //Create null values
            for (const key in model.props) {
                model.props[key].forEach(prop => entries.set(prop.name, null));
            }

            //Override existing/edited props
            for (const key in componentDoc.props) {
                entries.set(key, componentDoc.props[key]);
            }

            //Preupload images
            if (!!componentDoc.modifiedProps) {
                const images = componentDoc.modifiedProps.filter((propName) => model.props.images.find(obj => obj.name == propName));
                let i = 0;

                for (const img of images) {
                    this.setTasksState('imageUploadState', i, images.length, 'uploading-images', true);

                    const imgData = componentDoc.props[img];
                    const imageId = await this.uploadImage(imgData, isGlobal);

                    entries.set(img, imageId);
                    i++;
                }
            }
            return Object.fromEntries(entries);
        },
    },
    mixins: [imageController]
}

export default componentPropsCreator;