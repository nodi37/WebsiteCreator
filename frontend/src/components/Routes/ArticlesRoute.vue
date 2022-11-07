<script>
import PageGrid from "@/components/UI/PageGrid.vue";
import ComponentHolder from "@/components/UI/ComponentHolder.vue";
import AddCompBtn from "@/components/UI/Buttons/AddBtn.vue";
import store from "@/store";

export default {
	name: "ArticlesRoute",
	components: {
		PageGrid,
		ComponentHolder,
		AddCompBtn,
	},
	methods: {
		addNewHandler() {
			this.$router.push({ name: 'editArticle'});
		},
	},
	mounted() {
		store.dispatch("SET_NEW_TOOLBAR_TITLE", this.$t("articles"));
	},
};
</script>

<template>
	<page-grid>
		<component-holder>
			<add-comp-btn @click="addNewHandler" />
		</component-holder>
	</page-grid>
</template>
