<script>
import compsImporter from "@/helpers/inAppCompsImporter";
import axios from "axios";

export default {
	name: "Main",
	data: () => ({
		isLoaded: false,
		topComponents: [],
		bottomComponents: [],
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
		const api = process.env.VUE_APP_API_PATH;
		//Testing
		const topComponents = await axios.get(api + "layout-components/get-by-name/topLayout");
		const bottomComponents = await axios.get(api + "layout-components/get-by-name/bottomLayout");

		this.topComponents = topComponents.data.data || [];
		this.bottomComponents = bottomComponents.data.data || [];
		if (this.$route.path === "/") {
			this.$router.push({ name: "subpageView", params: { layoutName: "home" } });
		}
		//this.isLoaded = true;
	},
	mixins: [compsImporter],
};
</script>
<template>
	<div>
		<component
			v-for="(component, index) in topByOrder"
			:key="'top-' + index"
			v-bind:is="component.name"
			v-bind="component.props"
		/>

		<router-view />

		<component
			v-for="(component, index) in bottomByOrder"
			:key="'btm-' + index"
			v-bind:is="component.name"
			v-bind="component.props"
		/>
	</div>
</template>
