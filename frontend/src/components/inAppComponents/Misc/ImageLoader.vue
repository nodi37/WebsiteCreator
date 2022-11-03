<script>
import imageController from "@/controllers/image.controller";

export default {
	name: "ImageLoader",
	props: ["imageId"],
	data: () => ({
		imageData: null,
	}),
	mounted: async function () {
		const api = process.env.VUE_APP_API_PATH;
		const size = window.innerWidth > 2500 ? null: window.innerWidth > 1600 ? 'xlarge' : window.innerWidth > 1024 ? "large" : "medium";
		const imgDoc = await this.getImageById(this.imageId, size);
		this.imageData = imgDoc.isFile ? api + imgDoc.data : imgDoc.data;
	},
	mixins: [imageController],
}
</script>

<template>
	<img :src="imageData" />
</template>
