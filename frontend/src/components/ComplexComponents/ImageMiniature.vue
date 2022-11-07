<script>
import imageController from "@/controllers/image.controller";

export default {
	name: "ImageMiniature",
	props: ["imgId", "imgSrc"],
	data: () => ({
		imageData: "",
	}),
	mounted: async function () {
		if (!this.imgId) {
			this.imageData = this.imgSrc;
		} else {
			const imgDoc = await this.getImageById(this.imgId, "mini");
			this.imageData = imgDoc.data;
		}
	},
	mixins: [imageController],
};
</script>

<template>
	<figure class="flex-none w-32 h-32 rounded overflow-hidden drop-shadow-lg relative group">
		<div
			class="absolute h-full w-full flex flex-col gap-1 justify-center align-center opacity-0 group-hover:opacity-100 transition"
		>
			<slot name="actions"></slot>
		</div>
		<img class="w-full h-full object-cover" :src="imageData" />
	</figure>
</template>
