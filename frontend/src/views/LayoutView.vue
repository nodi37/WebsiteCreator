<script>
import compsImporter from "@/helpers/inAppCompsImporter";
import layoutController from "@/controllers/layout.controller";

export default {
	name: "LayoutView",
	data: () => ({
		notFound: false,
		components: [],
	}),
	props: ["layoutName", "isGlobal"],
	watch: {
		layoutName: async function (nV) {
			this.loadComps(nV);
		},
	},
	methods: {
		loadComps: async function (layoutName) {
			this.components = await this.loadLayoutComponentsByLayoutName(layoutName);
			this.notFound = this.components.length < 1 ? true : false;
		},
	},
	computed: {
		compsByOrder() {
			return this.components.sort((a, b) => a.order - b.order);
		},
	},

	mounted: async function () {
		try {
			this.loadComps(this.layoutName);
		} catch (error) {
			this.notFound = true;
		}
	},
	mixins: [compsImporter, layoutController],
};
</script>
<template>
	<not-found-404 v-if="notFound && !isGlobal" />
	<div v-else>
		<component
			v-for="(component, index) in compsByOrder"
			:key="layoutName + '-' + index"
			v-bind:is="component.name"
			v-bind="component.props"
		/>
	</div>
</template>
