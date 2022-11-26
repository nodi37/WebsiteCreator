import imageController from "@/controllers/image.controller";

const componentPropsCreator = {
  data: function () {
    return {
      taskInProgress: false,
      imageUploadState: {
        current: 0,
        count: 0,
        text: "",
      },
    };
  },
  methods: {
    createPropsObj: async function (componentDoc, isGlobal) {
      const model = this.getComponentModel(componentDoc.name);
      const entries = new Map();

      //Create null values
      for (const key in model.props) {
        model.props[key].forEach((prop) => entries.set(prop.name, { type: key, value: null }));
      }

      //Create empty arr
      //Change if support for more arrays added
      if (model.props.array.length > 0) {
        //console.log(model.props.array[0].values)
        entries.set(model.props.array[0].name, { type: "array", value: [] });
      }

      //Override existing/edited props
      for (const key in componentDoc.props) {
        entries.set(key, { type: componentDoc.props[key].type, value: componentDoc.props[key].value });
      }

      //Preupload images
      if (!!componentDoc.modifiedProps) {
        const imgProps = [];
        const arrProps = [];
        for (const prop of componentDoc.modifiedProps) {
          if (prop.type == "image") imgProps.push(prop.name);
          if (prop.type == "array" && !!prop.element) arrProps.push(prop);
        }

        //Preupload for standard images
        let i = 0;
        for (const img of imgProps) {
          this.setTasksState("imageUploadState", i, imgProps.length, "uploading-images", true);

          const imgData = componentDoc.props[img].value;
          let imageId = null;

          if (imgData) {
            imageId = await this.uploadImage(imgData, isGlobal);
          }

          entries.set(img, { type: "image", value: imageId });
          i++;
        }

        //Preupload for arrays
        i = 0;
        for (const prop of arrProps) {
          this.setTasksState("imageUploadState", i, imgProps.length, "uploading-images", true);

          if (prop.element && prop.element.value.type=='image') {
            const currentArrContent = componentDoc.props[prop.name].value;
            const updatedElementIndex = prop.element.index;
            const updatedElementName = prop.element.value.name;
            const updatedElementObject = currentArrContent[updatedElementIndex][updatedElementName];

            const imgData = updatedElementObject.value;
            let imageId = null;

            if (imgData) {
              imageId = await this.uploadImage(imgData, isGlobal);
            }

            updatedElementObject.value = imageId;
            //No need to set entry because edited object is already in entries
          }
          i++;
        }
      }

      return Object.fromEntries(entries);
    },
  },
  mixins: [imageController],
};

export default componentPropsCreator;
