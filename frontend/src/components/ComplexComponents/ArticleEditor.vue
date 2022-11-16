<script>
import articleManager from "@/helpers/articleManager";
import DatePicker from "@/components/UI/Pickers/DatePicker.vue";
import DoubleStateSnackbar from "@/components/UI/DoubleStateSnackbar.vue";
import ImagesPreviewContainer from "@/components/ComplexComponents/ImagesPreviewContainer.vue";
import ImageMiniature from "@/components/ComplexComponents/ImageMiniature.vue";
import ConfirmDialog from "@/components/UI/ConfirmDialog.vue";

export default {
	name: "ArticleEditor",
	props: ["articleId"],
	data: () => ({
		nameError: false,
		dateDialog: false,
		formDataLoading: false,

		imgFilesArr: [],
		imgsReaded: [],

		//Snackbar states
		snackBarStates: {
			sCurr: 0,
			sState: 0,
			mainCurr: 0,
			mainState: 0,
			text: "",
		},
	}),
	methods: {
		//Btn handlers
		saveBtnHandler: async function () {
			if (this.articleModel.name.length < 1) {
				this.nameError = true;
				return;
			}

			this.nameError = false;

			if (!this.articleDocId) {
				//const articleData =
				await this.saveArticleHandler(this.imgFilesArr);
				//this.$router.push({ name: "editArticle", query: { id: articleData._id } });
			} else {
				await this.updateArticleHandler(this.imgFilesArr);
			}

			//this.imgFilesArr = [];

			this.$router.push({ name: "articles" });
		},

		deleteBtnHandler: async function () {
			const ok = await this.$refs.confirmDeletionDialog.show({
				text: "are-you-sure",
				confirmBtnText: "delete",
				cancelBtnText: "cancel",
				confirmBtnColor: "error",
				cancelBtnColor: "primary",
			});

			if (!ok) return;

			await this.deleteArticleHandler();
			this.$router.push({ name: "articles" });
		},

		removeImgFile(imgFile) {
			this.imgFilesArr.splice(this.imgFilesArr.indexOf(imgFile), 1);
		},

		deleteImageBtnHandler(imgId) {
			this.deleteImageHandler(imgId);
		},
		setMainImageBtnHandler(imgId) {
			this.setMainImageHandler(imgId);
		},

		//Others
		setSnackBarMainState: function (newValues) {
			this.snackBarStates.mainCurr = newValues.current;
			this.snackBarStates.mainState = newValues.count;
			const counter = newValues.count > 1 ? `${newValues.current}/${newValues.count}...` : "";
			this.snackBarStates.text = `${this.$t(newValues.text)} ${counter}`;
		},
	},
	watch: {
		//Watching images
		imgFilesArr(nV) {
			this.formDataLoading = true;
			const tempArr = [];

			for (const imgFile of nV) {
				const reader = new FileReader();
				reader.onload = (e) => {
					tempArr.push({ src: e.target.result, imgFile: imgFile });
				};
				reader.readAsDataURL(imgFile);
			}

			this.imgsReaded = tempArr;
			this.formDataLoading = false;
		},
		//Watching error in articleManager and emiting error
		isError: function () {
			if (this.isError) this.emit("error");
		},

		//Watching tasks for snackbar
		taskState: {
			handler: function (nV) {
				this.setSnackBarMainState(nV);
			},
			deep: true,
		},
		imageUploadState: {
			handler: function (nV) {
				this.snackBarStates.sCurr = nV.current;
				this.snackBarStates.sState = nV.count;
			},
			deep: true,
		},
	},
	mounted() {
		if (!this.articleId) return;
		this.articleDocId = this.articleId;
	},
	components: { DatePicker, DoubleStateSnackbar, ImagesPreviewContainer, ImageMiniature, ConfirmDialog },
	mixins: [articleManager],
};
</script>

<template>
	<div class="pa-4">
		<v-card elevation="1" :disabled="isLoading" :loading="isLoading">
			<v-card-title>{{ !articleModel._id ? "create-article" : "edit article" }}</v-card-title>
			<div class="pa-2">
				<v-text-field v-model="articleModel.name" :error="nameError" label="article-name" outlined />
				<v-textarea v-model="articleModel.content" label="article-content" outlined no-resize auto-grow />

				<!-- DATE INPUT -->
				<v-text-field
					v-model="articleModel.userDate"
					@click="dateDialog = true"
					label="article-date"
					readonly
					outlined
				/>
				<date-picker v-model="articleModel.userDate" :visible="dateDialog" @close="dateDialog = false" />
				<!-- DATE INPUT -->

				<!-- Images -->
				<!-- FILE INPUT -->
				<v-file-input
					:loading="formDataLoading"
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

				<!-- PREVIEW CONAINER -->

				<!-- NEW IMAGES -->
				<images-preview-container v-if="imgFilesArr.length > 0" :toSave="true">
					<image-miniature v-for="(img, i) in imgsReaded" :key="'not-saved-' + i" :imgSrc="img.src">
						<template v-slot:actions>
							<v-btn color="error" small @click="removeImgFile(img.imgFile)">Delete</v-btn>
						</template>
					</image-miniature>
				</images-preview-container>
				<!-- NEW IMAGES -->

				<!-- Loaded IMAGES -->
				<images-preview-container v-if="articleModel.galleryImgs.length > 0" :toSave="false">
					<image-miniature v-for="(imgId, i) in articleModel.galleryImgs" :key="'saved-' + i" :imgId="imgId">
						<template v-slot:actions>
							<v-btn small color="error" @click="deleteImageBtnHandler(imgId)">delete</v-btn>
							<v-btn small color="success" @click="setMainImageBtnHandler(imgId)">main</v-btn>
						</template>
					</image-miniature>
				</images-preview-container>
				<!-- Loaded IMAGES -->
				<!-- Images -->

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
				<v-btn @click="deleteBtnHandler" :disabled="!articleDocId" color="error">delete</v-btn>
				<v-btn @click="saveBtnHandler" color="success">save</v-btn>
			</v-card-actions>
		</v-card>
		<double-state-snackbar
			:text="snackBarStates.text"
			:visible="taskInProgress"
			:crclrPrgCurrStep="snackBarStates.sCurr"
			:crclrPrgStepsCount="snackBarStates.sState"
			:lnrPrgCurrStep="snackBarStates.mainCurr"
			:lnrPrgStepsCount="snackBarStates.mainState"
		/>
		<confirm-dialog ref="confirmDeletionDialog" />
	</div>
</template>
