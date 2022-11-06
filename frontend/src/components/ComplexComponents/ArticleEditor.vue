<script>
import * as config from "@/configs/articleConfig.js";
import imageUtils from "@/utils/images.utils.js";
import DatePicker from "@/components/UI/Pickers/DatePicker.vue";

export default {
	name: "ArticleEditor",
	props: ["articleData"],
	data: () => ({
		dateDialog: false,
		articleModel: {
			mainImageId: "",
			name: "",
			content: "",
			href: "",
			userDate: "",
			createDate: "",
			galleryImgs: [],
			tags: [],
			isPublic: false,
		},
		imgFilesArr: [],
		imgsBase64: [],
		imagesLoading: false,
	}),
	watch: {
		imgFilesArr: async function (nV) {
			this.imagesLoading = true;
			const b64s = [];

			for (const img of nV) {
				const b64 = await this.resizeImage(img, config.imagesWidthPx);
				b64s.push(b64);
			}

			this.imgsBase64 = b64s;
			this.imagesLoading = false;
		},
	},
	methods: {
		saveBtnHandler() {
			console.log(this.imgsBase64);
		},
		removeQueuedImg(i) {
			console.log(i);
			this.imgFilesArr.splice(i, 1);
		},
	},
	components: { DatePicker },
	mixins: [imageUtils],
};
</script>

<template>
	<div class="pa-4">
		<v-card elevation="1">
			<v-card-title>New article</v-card-title>
			<div class="pa-2">
				<v-text-field v-model="articleModel.name" label="article-name" outlined />
				<v-textarea v-model="articleModel.content" label="article-content" outlined no-resize auto-grow />
				<v-text-field
					v-model="articleModel.userDate"
					@click="dateDialog = true"
					label="article-date"
					outlined
				/>
				<date-picker v-model="articleModel.userDate" :visible="dateDialog" @close="dateDialog = false" />

				<!-- NEW IMAGES -->
				<v-file-input
					:loading="imagesLoading"
					v-model="imgFilesArr"
					accept="image/png, image/jpeg, image/bmp"
					label="gallery-images"
					prepend-icon=""
					outlined
					counter
					multiple
					show-size
					truncate-length="10"
				/>
				<div
					v-if="imgsBase64.length > 0"
					class="flex flex-wrap gap-2 mb-4 pa-2 pt-8 relative border-dotted border-2 border-yellow-500"
				>
					<span class="absolute top-1 left-2 font-bold uppercase text-sm text-gray-500">to-save:</span>
					<figure
						class="flex-none w-32 h-32 rounded overflow-hidden drop-shadow-lg relative group"
						v-for="(img, i) in imgsBase64"
						:key="'not-saved-' + i"
					>
						<div
							class="absolute h-full w-full flex justify-center align-center opacity-0 group-hover:opacity-100 transition"
						>
							<v-btn color="error" @click="removeQueuedImg(i)">Delete</v-btn>
						</div>
						<img class="w-full h-full object-cover" :src="img" />
					</figure>
				</div>
				<!-- NEW IMAGES -->
				<!-- OLD IMAGES -->

			


				<!-- OLD IMAGES -->

				<v-combobox v-model="articleModel.tags" label="tags" multiple outlined small-chips />
				<div class="flex items-bottom">
					<span class="mr-2 mt-1">Public: </span>
					<v-checkbox
						class="mt-0"
						v-model="articleModel.isPublic"
						:color="articleModel.isPublic ? 'success' : 'primary'"
						inset
					/>
				</div>
			</div>
			<v-card-actions class="justify-end">
				<v-btn @click="saveBtnHandler" color="success">save</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
