<script>
import ShapedList from "@/components/UI/Lists/ShapedList.vue";
import store from "@/store";

export default {
	name: "PanelView",
	data: () => ({
		drawer: true,
		items: [
			{ text: "Global template", icon: "mdi-page-layout-body", path: { name: "globalTemplate" } },
			{
				text: "Home page",
				icon: "mdi-page-layout-header-footer",
				path: {
					name: "layoutManager",
					query: {
						layout: "homeLayout",
					},
				},
			},
			{ text: "Articles", icon: "mdi-file-document-edit-outline", path: { name: "articles" } },
			{ text: "Galleries", icon: "mdi-camera", path: { name: "galleries" } },
			{ text: "Add subpage", icon: "mdi-plus", path: { name: "addSubpage" } },
		],
	}),
	computed: {
		pageName() {
			return store.state.pageName;
		},
		toolbarTitle() {
			return store.state.toolbarTitle || "Control Panel";
		},
	},
	components: {
		ShapedList,
	},
};
</script>
<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" app>
			<div class="w-full text-center">
				<p class="font-Roboto font-bold my-5">{{ pageName }}</p>
			</div>
			<v-divider />
			<ShapedList header="Main settings" :items="items" />
			<v-divider />
		</v-navigation-drawer>

		<v-app-bar app>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>
