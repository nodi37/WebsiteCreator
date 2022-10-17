<script>
import axios from "axios";

export default {
	name: "ImageLoader",
	props: ["imageId"],
	data: () => ({
		imageData: null,
	}),
	mounted: async function () {
		const api = process.env.VUE_APP_API_PATH;
		const imageRequest = await axios.get(api + "image/get/" + this.imageId);
		const imgDoc = imageRequest.data.data;
		this.imageData = imgDoc.isFile ? api + imgDoc.data : imgDoc.data;
	},
};
</script>

<template>
	<img :src="imageData" /> 
</template>
