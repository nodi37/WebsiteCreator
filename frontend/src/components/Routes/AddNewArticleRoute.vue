<script>
import ArticleEditor from "@/components/ComplexComponents/ArticleEditor.vue";
import store from '@/store';

export default {
	name: "AddNewArticleRoute",
	components: { ArticleEditor },
	mounted() {
		store.dispatch("SET_NEW_TOOLBAR_TITLE", this.$t("add-article"));
	},
};
</script>
<template>
	<article-editor />
</template>
