<script>
import imageUtils from "@/utils/images.utils";

export default {
	name: "ImagesList",
	props: ["images", "value"],
	methods: {
		prepareImage: async function (model, imgId, file) {
			const resized = !file ? null : await this.resizeImage(file, model.maxSize, model.format);
			if (!!imgId) this.$emit("toremove", { type: "image", id: imgId });
			this.value[model.name].value = resized;
			this.$emit("modified", {type:'image', name: model.name});
		},
	},
	mixins: [imageUtils],
};
</script>

<template>
	<v-list flat>
		<v-list-item v-for="(image, i) in images" :key="image + '-' + i">
			<div class="flex flex-col">
				<v-divider class="mb-1" />
				<v-file-input
					@change="prepareImage(image, value[image.name].value, $event)"
					:label="$t(image.name)"
					:suffix="!!value[image.name].value ? $t('contains-image') : ''"
					filled
					prepend-icon="mdi-camera"
					accept="image/png, image/jpeg, image/bmp"
				></v-file-input>
				<v-btn
					class="self-end -mt-4 mb-1"
					color="error"
					small
					:disabled="!value[image.name].value"
					@click="prepareImage(image, value[image.name].value, null)"
				>
					{{ $t("delete-image") }}
				</v-btn>
				<v-divider />
			</div>
		</v-list-item>
	</v-list>
</template>
