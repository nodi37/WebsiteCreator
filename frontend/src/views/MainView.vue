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
	methods: {
		setUserLayout() {
			const uLayout = this.$route.params.layoutName;

			if (this.$route.path === "/") {
				this.userLayout = "homeLayout";
			}

			if (!!uLayout) {
				this.userLayout = uLayout;
			}

			this.isLoaded = true;
		},
	},
	watch: {
		"$route.params.layoutName": function () {
			this.setUserLayout();
		},
	},
	mounted: async function () {
		this.setUserLayout();
	},
	computed: {
		topByOrder() {
			return this.topComponents.sort((a, b) => a.order - b.order);
		},
		bottomByOrder() {
			return this.bottomComponents.sort((a, b) => a.order - b.order);
		},
	},
	components: { LayoutView },
	mixins: [compsImporter],
};
</script>
<template>
	<div>
		<!-- need to add some loader -->
		<layout-view v-if="isLoaded" :isGlobal="true" layoutName="topLayout" />
		<layout-view v-if="isLoaded" :isGlobal="false" :layoutName="userLayout" />
		<layout-view v-if="isLoaded" :isGlobal="true" layoutName="bottomLayout" />
	</div>
</template>
