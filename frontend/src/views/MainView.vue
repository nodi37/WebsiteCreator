<script>
import compsImporter from "@/helpers/inAppCompsImporter";
import LayoutView from "@/views/LayoutView.vue";

export default {
	name: "Main",
	data: () => ({
		topComponents: [],
		bottomComponents: [],
		userLayout: "",
		isLoaded: false,
	}),
	computed: {
		topByOrder() {
			return this.topComponents.sort((a, b) => a.order - b.order);
		},
		bottomByOrder() {
			return this.bottomComponents.sort((a, b) => a.order - b.order);
		},
	},
	mounted: async function () {
		if (this.$route.path === "/") {
			this.userLayout = "homeLayout";
		}

		this.isLoaded = true;
	},
	components: { LayoutView },
	mixins: [compsImporter],
};
</script>
<template>
	<div>
		<!-- need to add some loader -->
		<layout-view v-if="isLoaded" layoutName="topLayout" />
		<layout-view v-if="isLoaded" :layoutName="userLayout" />
		<layout-view v-if="isLoaded" layoutName="bottomLayout" />
	</div>
</template>
