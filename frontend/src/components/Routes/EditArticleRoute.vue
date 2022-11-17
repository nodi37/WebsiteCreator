<script>
import ArticleEditor from "@/components/ComplexComponents/ArticleEditor.vue";
import store from "@/store";
import ErrorOverlay from "../ComplexComponents/ErrorOverlay.vue";

export default {
	name: "AddNewArticleRoute",
	data: () => ({
		loaded: false,
		errored: false,
		articleId: null,
	}),
	mounted() {
		if (!this.$route.query.id) {
			store.dispatch("SET_NEW_TOOLBAR_TITLE", "add-article");
		} else {
			store.dispatch("SET_NEW_TOOLBAR_TITLE", "edit-article");
			this.articleId = this.$route.query.id;
		}
		this.loaded = true;
	},
	components: { ArticleEditor, ErrorOverlay },
};
</script>
<template>
	<div>
		<article-editor v-if="loaded" :articleId="articleId" @error="errored = true" />
		<error-overlay :isVisible="errored" />
	</div>
</template>
