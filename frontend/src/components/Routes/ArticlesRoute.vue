<script>
import PageGrid from "@/components/UI/PageGrid.vue";
import ComponentHolder from "@/components/UI/ComponentHolder.vue";
import AddCompBtn from "@/components/UI/Buttons/AddBtn.vue";
import ImageMiniature from "@/components/ComplexComponents/ImageMiniature.vue";

import articleController from "@/controllers/article.controller";
import store from "@/store";

export default {
	name: "ArticlesRoute",
	data: function () {
		return {
			articles: [],
			filters: {
				keyword: "",
				isPublic: null,
			},

			skip: 0,
			limit: 5,

			isPublicBtnsValue: 0,
			isPublicItems: ["all", "not public", "public"],
		};
	},
	methods: {
		addNewBtnHandler() {
			this.$router.push({ name: "editArticle" });
		},
		editArticleHandler(artId) {
			this.$router.push({ name: "editArticle", query: { id: artId } });
		},
		loadArticles: async function () {
			const queryObj = {
				isPublic: this.filters.isPublic,
				keyword: this.filters.keyword,
				skip: this.skip,
				limit: this.limit
			};

			//Need to fix this
			const newAricles = await this.getManyArticlesFromServer(queryObj);
			this.articles = [...this.articles, ...newAricles];
			//Check length add load more btn and so on
		},
		getFormatedDate(date) {
			return new Date(date).toLocaleString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
		},
	},
	watch: {
		isPublicBtnsValue(nV) {
			switch (nV) {
				case 1:
					this.filters.isPublic = false;
					break;

				case 2:
					this.filters.isPublic = true;
					break;

				default:
					this.filters.isPublic = null;
					break;
			}
		},

		filters: {
			handler() {
				this.articles = [];
				this.loadArticles();
			},
			deep: true,
		},
	},
	mounted: async function () {
		store.dispatch("SET_NEW_TOOLBAR_TITLE", this.$t("articles"));
		this.loadArticles();
	},
	components: {
		PageGrid,
		ComponentHolder,
		AddCompBtn,
		ImageMiniature,
	},
	mixins: [articleController],
};
</script>

<template>
	<page-grid>
		<component-holder>
			<add-comp-btn @click="addNewBtnHandler" />
		</component-holder>
		<div>
			<div>
				<v-text-field v-model="filters.keyword" solo label="search" />
			</div>
			<div>
				<v-btn-toggle v-model="isPublicBtnsValue">
					<v-btn small v-for="(item, i) in isPublicItems" :key="'isPublic-' + i">
						{{ item }}
					</v-btn>
				</v-btn-toggle>
			</div>
		</div>
		<v-card
			v-for="article in articles"
			:key="article._id"
			@click="editArticleHandler(article._id)"
			class="pa-2 flex flex-row gap-2"
		>
			<image-miniature :imgId="article.mainImageId" />

			<div class="flex flex-col items-start text-sm">
				<h3 class="text-slate-700 text-xl font-medium">{{ article.name }}</h3>
				<span class="text-slate-500">Date: {{ getFormatedDate(article.userDate) }}</span>
				<div class="text-slate-500">
					<span>Tags:&nbsp;</span>
					<span v-for="tag in article.tags" :key="article._id + '-' + tag">{{ tag }},&nbsp;</span>
				</div>
				<v-chip class="mt-auto" :color="article.isPublic ? 'success' : 'warning'" label small>
					{{ article.isPublic ? "public" : "not public" }}
				</v-chip>
			</div>

			<v-icon x-large class="ml-auto"> mdi-chevron-right </v-icon>
		</v-card>
	</page-grid>
</template>
