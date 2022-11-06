<script>
import imageController from "@/controllers/image.controller";

export default {
	name: "ImageLoader",
	props: ["imageId", "fixedSize"],
	//Fixed size should be null, xlarge, large, medium or mini
	data: () => ({
		imageData: null,
	}),
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
		} else if (windowWidth > 512) {
			size = "medium"
		}

		const imgDoc = await this.getImageById(this.imageId, size);
		this.imageData = imgDoc.isFile ? api + imgDoc.data : imgDoc.data;
	},
	mixins: [imageController],
};
</script>

<template>
	<img :src="imageData" />
</template>
