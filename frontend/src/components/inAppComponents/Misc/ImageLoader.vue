<script>
import imageController from "@/controllers/image.controller";
import store from "@/store";

export default {
  name: "ImageLoader",
  props: ["imageId", "fixedSize"],
  //Fixed size should be null, xlarge, large, medium or mini
  data: () => ({
    imageData: null,
  }),
  computed: {
	imgsArr(){
		return store.state.loadedImages;
	}
  },
  mounted: async function () {
    const api = process.env.VUE_APP_API_PATH;
    const windowWidth = window.innerWidth;
    let size = "mini";

    if (!!this.fixedSize) {
      size = this.fixedSize;
    } else if (windowWidth > 2600) {
      size = null;
    } else if (windowWidth > 1600) {
      size = "xlarge";
    } else if (windowWidth > 1024) {
      size = "large";
    } else if (windowWidth > 300) {
      size = "medium";
    }

    const loadedImg = this.imgsArr.find((img) => img._id === this.imageId);
    let imgDoc;

    if (!loadedImg) {
      imgDoc = await this.getImageById(this.imageId, size);
      store.dispatch("PUSH_NEW_IMAGE", { ...imgDoc, size: size });
    } else {
      imgDoc = loadedImg;
    }

    this.imageData = imgDoc.isFile ? api + imgDoc.data : imgDoc.data;
  },
  mixins: [imageController],
};
</script>

<template>
  <img @click="$emit('click')" :src="imageData" />
</template>
