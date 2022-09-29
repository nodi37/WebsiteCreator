<script>
import LayoutManager from "../ComplexComponents/LayoutManager.vue";
import ErrorOverlay from "@/components/ComplexComponents/ErrorOverlay.vue";
import PageGrid from "@/components/UI/PageGrid.vue";
import ComponentHolder from "@/components/UI/ComponentHolder.vue";
import store from "@/store";

export default {
	name: "GlobalRoute",
	data: function () {
		return {
			layoutErrored: false,
			topLayout: "",
			bottomLayout: "",
		};
	},
	components: {
		LayoutManager,
		ErrorOverlay,
		PageGrid,
        ComponentHolder
	},
	mounted() {
		this.topLayout = "topLayout";
		this.bottomLayout = "bottomLayout";
		store.dispatch("SET_NEW_TOOLBAR_TITLE", this.$t('globalLayout'));
	},
};
</script>

<template>
	<page-grid>
		<error-overlay :isVisible="layoutErrored" />
		<layout-manager v-on:error="layoutErrored = true" :layoutName="topLayout" />
		<component-holder>
			<div class="h-64 flex justify-center align-center font-Roboto font-semibold text-xl text-gray-500">
				<span>Here will be the content of subpages</span>
			</div>
		</component-holder>
		<layout-manager v-on:error="layoutErrored = true" :layoutName="bottomLayout" />
	</page-grid>
</template>
