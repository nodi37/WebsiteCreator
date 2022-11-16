<script>
import PageGrid from "@/components/UI/PageGrid.vue";
import ComponentHolder from "@/components/UI/ComponentHolder.vue";
import AddCompBtn from "@/components/UI/Buttons/AddBtn.vue";
import ArticleCard from "@/components/ComplexComponents/ArticleCard.vue";
import ErrorOverlay from '../ComplexComponents/ErrorOverlay.vue';

import articleController from "@/controllers/article.controller";
import store from "@/store";


//	Probably FIXED
////	I need to make it better
////	Case:
////	Filter is set and load more btn is clicked
////	New articles are loaded but nothing shows because loaded documents not fits the filters
////	Button stays active because more data is avaiable on server
////	If there is a lot of documents and just last one fits filters, user need to click load more many times
//	Probably FIXED

export default {
	name: "ArticlesRoute",
	data: function () {
		return {
			articles: [],
			filters: {
				keyword: "",
				isPublic: null,
			},

			//filtersEmptyObj needs to be copy of >filters< obj
			filtersEmptyObj: {
				keyword: "",
				isPublic: null,
			},

			//Article loads counts
			onCompMountCount: 5,
			loadMoreBtnCount: 10,

			//Skip query
			skip: 0,

			//Article loading states
			isFetching: false,
			nothingMoreToLoad: false,
			allPossibleDataLoaded: false,
			loadError: false,

			// Public/Not public button values
			isPublicBtnsValue: null,
			isPublicItems: ["public", "not-public"],

			// Sort button values
			sortBtnsValue: 0,
			sortItems: ["recently-created", "article-date"],
		};
	},
	methods: {
		//Events handlers
		addNewBtnHandler() {
			this.$router.push({ name: "editArticle" });
		},

		editArticleHandler(artId) {
			this.$router.push({ name: "editArticle", query: { id: artId } });
		},

		loadMoreBtnHanlder: function () {
			this.loadManyArticles(this.loadMoreBtnCount);
		},

		//Loading articles
		//ADD TRY CATCH TO SET ERROR
		//Add ERROR OVERLAY
		loadArticle: async function () {
			try {
				const queryObj = {
					skip: this.skip,
					limit: 1,
					sortBy: "createDate",
					sortOrder: "descending",
				};

				const queryObjWithFilters = {
					...queryObj,
					...this.filters,
				};

				const objToSend = this.filtersSet ? queryObjWithFilters : queryObj;

				const newAricles = await this.getManyArticlesFromServer(objToSend);

				this.nothingMoreToLoad = !newAricles[0] ? true : false;
				this.skip += 1;
				this.articles = [...this.articles, ...newAricles];
			} catch (error) {
				this.loadError = true;
			}
		},

		loadManyArticles: async function (count) {
			this.isFetching = true;

			for (let i = 0; i < count; i++) {
				await this.loadArticle();
				if (this.nothingMoreToLoad && !this.filtersSet) this.allPossibleDataLoaded = true;
				if (this.nothingMoreToLoad) break;
			}

			this.isFetching = false;
		},
	},
	computed: {
		//Calculating filters
		filteredArticles: function () {
			//Filtering by keyword
			const keywordFilter = this.articles.filter(
				(art) =>
					art.name.toLowerCase().includes(this.filters.keyword.toLowerCase()) ||
					art.tags.includes(this.filters.keyword.toLowerCase())
			);

			//Filtering by isPublic value
			const isPublicFilter = this.articles.filter((art) => {
				const isPublic = this.filters.isPublic;
				if (isPublic === null) return true;
				if (isPublic) return art.isPublic;
				if (!isPublic) return !art.isPublic;
			});

			//Filtering arrays
			const filtersArr = [keywordFilter, isPublicFilter];
			const filteredArticles = filtersArr.reduce((pV, cV) => pV.filter((article) => cV.includes(article)));

			//Sorting results
			const filteredAndSorted = filteredArticles.sort((artA, artB) => {
				switch (this.sortBtnsValue) {
					case 1:
						return new Date(artB.userDate).getTime() - new Date(artA.userDate).getTime();
					default:
						return -1;
				}
			});

			return filteredAndSorted;
		},

		//Checking if any filters are set
		filtersSet: function () {
			return JSON.stringify(this.filters) !== JSON.stringify(this.filtersEmptyObj);
		},

		//Calculating disable prop for LoadMoreBtn
		loadMoreDisabled: function () {
			return this.nothingMoreToLoad || this.allPossibleDataLoaded;
		},
	},
	watch: {
		//Setting filter value according to btn value
		isPublicBtnsValue(nV) {
			switch (nV) {
				case 0:
					this.filters.isPublic = true;
					break;
				case 1:
					this.filters.isPublic = false;
					break;
				default:
					this.filters.isPublic = null;
					break;
			}
		},

		//Watching filters reset
		filters: {
			handler: function () {
				if ((!this.filtersSet || this.filteredArticles.length < 1) && !this.allPossibleDataLoaded) {
					this.articles = [];
					this.skip = 0;
					this.nothingMoreToLoad = false;
					this.loadManyArticles(this.onCompMountCount);
				} else {
					this.skip = this.filteredArticles.length;
					this.nothingMoreToLoad = false;
				}
			},
			deep: true,
		},
	},
	components: {
		PageGrid,
		ComponentHolder,
		AddCompBtn,
		ArticleCard,
		ErrorOverlay,
	},
	mixins: [articleController],
	mounted: async function () {
		store.dispatch("SET_NEW_TOOLBAR_TITLE", this.$t("articles"));
		await this.loadManyArticles(this.onCompMountCount);
	},
};
</script>

<template>
	<page-grid>
		<component-holder>
			<add-comp-btn @click="addNewBtnHandler" />
		</component-holder>

		<!-- search bar -->
		<div>
			<v-text-field v-model="filters.keyword" solo label="search" />
		</div>
		<!-- search bar -->

		<!-- filters -->
		<div class="-mt-8">
			<span class="block pa-0 mb-1 text-slate-400">filters</span>
			<v-btn-toggle v-model="isPublicBtnsValue">
				<v-btn :disabled="isFetching" small v-for="(item, i) in isPublicItems" :key="'isPublic-' + i">
					{{ item }}
				</v-btn>
			</v-btn-toggle>
		</div>
		<!-- filters -->

		<!-- sorting -->
		<div>
			<span class="block pa-0 mb-1 text-slate-400">sort by:</span>
			<v-btn-toggle v-model="sortBtnsValue">
				<v-btn :disabled="isFetching" small v-for="(item, i) in sortItems" :key="'sortItem-' + i">
					{{ item }}
				</v-btn>
			</v-btn-toggle>
		</div>
		<!-- sorting -->

		<!-- Article card -->
		<article-card
			v-for="article in filteredArticles"
			:key="article._id"
			:articleData="article"
			@click="editArticleHandler(article._id)"
		/>
		<!-- Article card -->

		<!-- Load more btn -->
		<v-btn
			class="ma-8"
			:loading="isFetching"
			:disabled="loadMoreDisabled"
			color="primary"
			@click="loadMoreBtnHanlder"
			>{{ loadMoreDisabled ? "nothing-more-here" : "Load more" }}</v-btn
		>
		<!-- Load more btn -->

		<!-- Error overlay -->
		<error-overlay :isVisible="loadError" />
		<!-- Error overlay -->
	</page-grid>
</template>
