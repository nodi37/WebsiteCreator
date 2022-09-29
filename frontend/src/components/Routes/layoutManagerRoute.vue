<script>
import LayoutManager from "../ComplexComponents/LayoutManager.vue";
import ErrorOverlay from "@/components/ComplexComponents/ErrorOverlay.vue";
import PageGrid from "@/components/UI/PageGrid.vue";
import store from "@/store";

export default {
	name: "HomePageRoute",
	data: function () {
		return {
			layoutErrored: false,
			currentLayout: "",
		};
	},
	components: {
		LayoutManager,
		ErrorOverlay,
		PageGrid,
	},

	watch: {
		"$route.params": {
			handler: function () {
				this.loadNewLayout();
			},
			deep: true,
		},
	},

	methods: {
		loadNewLayout: function () {
			this.currentLayout = this.$route.params.layoutName;
			store.dispatch("SET_NEW_TOOLBAR_TITLE", this.$t(this.currentLayout));
		},
	},

	mounted: function () {
		this.loadNewLayout();
	},
};
</script>

<template>
	<page-grid>
		<error-overlay :isVisible="layoutErrored" />
		<layout-manager v-on:error="layoutErrored = true" :layoutName="currentLayout" />
	</page-grid>
</template>
