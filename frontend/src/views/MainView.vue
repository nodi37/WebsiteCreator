<script>
import LogoBar from "@/components/inAppComponents/LogoBar.vue";
import FullWidthImage from "@/components/inAppComponents/FullWidthImage.vue";
import axios from "axios";

export default {
	name: "Main",
	data: () => ({
		topComponents: [],
		bottomComponents: [],
	}),
	components: {
		LogoBar,
		FullWidthImage,
	},
	mounted: async function () {
		const api = process.env.VUE_APP_API_PATH;
		//To ADD
		//*LOADING
		//*ROUTES
		const topComponents = await axios.get(api + "layout-components/get-by-name/TopLayout");
		const bottomComponents = await axios.get(api + "layout-components/get-by-name/BottomLayout");
		this.topComponents = topComponents.data.data || [];
		this.bottomComponents = bottomComponents.data.data || [];
	},
};
</script>
<template>
	<div>
		<component
			v-for="(component, index) in topComponents"
			:key="index"
			v-bind:is="component.name"
			v-bind="component.props"
		/>
		<router-view />
		<component
			v-for="(component, index) in bottomComponents"
			:key="index"
			v-bind:is="component.name"
			v-bind="component.props"
		/>
	</div>
</template>
