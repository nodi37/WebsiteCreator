<script>
import ArticleEditor from "@/components/ComplexComponents/ArticleEditor.vue";
import store from "@/store";

export default {
	name: "AddNewArticleRoute",
	data: () => ({
		loaded: false,
		articleId: null,
	}),
	mounted() {
		if (!this.$route.query.id) {
			store.dispatch("SET_NEW_TOOLBAR_TITLE", this.$t("add-article"));
		} else {
			store.dispatch("SET_NEW_TOOLBAR_TITLE", this.$t("edit-article"));
			this.articleId = this.$route.query.id;
		}
		this.loaded = true;
	},
	components: { ArticleEditor },
};
</script>
<template>
	<div>
		<article-editor v-if="loaded" :articleId="articleId" />
	</div>
</template>
