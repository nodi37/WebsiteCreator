<script>
import imageUtils from "@/utils/images.utils";

export default {
	name: "ImagesList",
	props: ["images", "value"],
	methods: {
		prepareImage: async function (model, file) {
			const resized = await this.resizeImage(file, model.maxSize, model.format);
			this.$emit("toremove", { type: "image", id: this.value[model.name] });
			this.value[model.name] = resized;
			this.$emit("modified", model.name);
		},
	},
	mixins: [imageUtils],
};
</script>

<template>
	<v-list flat>
		<v-list-item v-for="(image, i) in images" :key="image + '-' + i">
			<v-file-input
				@change="prepareImage(image, $event)"
				:label="image.name"
				:suffix="!!value[image.name] ? $t('contains-image') : ''"
				filled
				prepend-icon="mdi-camera"
				accept="image/png, image/jpeg, image/bmp"
			></v-file-input>
		</v-list-item>
	</v-list>
</template>
