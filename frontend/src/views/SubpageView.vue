<script>
import compsImporter from "@/helpers/inAppCompsImporter";
import axios from "axios";

export default {
	name: "SubpageView",
	data: () => ({
		isLoaded: false,
		notFound: false,
		components: [],
	}),
	computed: {
		compsByOrder() {
			return this.components.sort((a, b) => a.order - b.order);
		},
	},
	mounted: async function () {
		//Testing
		const api = process.env.VUE_APP_API_PATH;
		const lNameParam = this.$route.params.layoutName;
		const layoutName = lNameParam == "home" ? "homeLayout" : lNameParam;
		const pageReq = await axios.get(api + "layout-components/get-by-name/" + layoutName);
		this.components = pageReq.data.data || [];
		this.notFound = this.components.length > 0 ? false : true;
		//this.isLoaded = true;
	},
	mixins: [compsImporter],
};
</script>
<template>
    <not-found-404 v-if="notFound" />
	<div v-else>
		<component
			v-for="(component, index) in compsByOrder"
			:key="index"
			v-bind:is="component.name"
			v-bind="component.props"
		/>
	</div>
</template>
