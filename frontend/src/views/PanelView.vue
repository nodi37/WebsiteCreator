<script>
import ShapedList from "@/components/UI/Lists/ShapedList.vue";
import store from "@/store";
import layoutController from "@/controllers/layout.controller";
import ErrorOverlay from "@/components/ComplexComponents/ErrorOverlay.vue";


//Refactoring needed
export default {
	name: "PanelView",
	data: () => ({
		drawer: true,
		layoutsLoaded: false,
		isError: false,
		items: [
			{ text: "Global template", icon: "mdi-page-layout-body", path: { name: "globalTemplate" } },
			{
				text: "Home page",
				icon: "mdi-page-layout-header-footer",
				path: {
					name: "layoutManager",
					params: {
						layoutName: "homeLayout",
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
		layoutsDocs() {
			return store.state.additionalLayouts.filter((layout) => !layout.isRequired);
		},
		additionalItems() {
			return this.layoutsDocs.map((layout) => {
				return {
					text: layout.name.charAt(0).toUpperCase() + layout.name.slice(1),
					icon: "mdi-page-layout-header-footer",
					path: {
						name: "layoutManager",
						params: {
							layoutName: layout.name,
						},
					},
				};
			});
		},
	},
	components: {
		ShapedList,
		ErrorOverlay,
	},
	mixins: [layoutController],
	mounted: async function () {
		try {
			const allLayouts = await this.getManyLayouts();
			store.dispatch("REPLACE_ALL_LAYOUTS", allLayouts);
			this.layoutsLoaded = true;
		} catch (error) {
			console.log(error);
			this.isError = true;
		}
	},
};
</script>
<template>
	<v-app id="inspire" v-if="layoutsLoaded">
		<v-navigation-drawer v-model="drawer" app>
			<div class="w-full text-center">
				<p class="font-Roboto font-bold my-5">{{ pageName }}</p>
			</div>
			<v-divider />
			<shaped-list header="main-settings" :items="items" />
			<v-divider />
			<shaped-list header="user-layouts" :items="additionalItems" />
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
