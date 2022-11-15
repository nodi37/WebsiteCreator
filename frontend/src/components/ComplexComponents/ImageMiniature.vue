<script>
import imageController from "@/controllers/image.controller";
import store from "@/store";

export default {
	name: "ImageMiniature",
	props: ["imgId", "imgSrc"],
	data: () => ({
		imageData: "",
	}),
	computed: {
		imgsArr() {
			return store.state.loadedImages;
		},
	},
	mounted: async function () {
		if (!this.imgId) {
			this.imageData = this.imgSrc;
		} else {
			//Can add size prop to search
			//This is smallest size so every bigger size will fit too
			const loadedImg = this.imgsArr.find((img) => img._id === this.imgId);

			if (!loadedImg) {
				const imgDoc = await this.getImageById(this.imgId, "mini");
				store.dispatch("PUSH_NEW_IMAGE", { ...imgDoc, size: "mini" });
				this.imageData = imgDoc.data;
			} else {
				this.imageData = loadedImg.data;
			}
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
			{{ imgsArr }}
			<slot name="actions"></slot>
		</div>
		<img class="w-full h-full object-cover" :src="imageData" />
	</figure>
</template>
