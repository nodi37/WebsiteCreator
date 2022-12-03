<script>
import TitledCard from "@/components/UI/Cards/TitledCard.vue";
import ConfirmDialog from "../UI/ConfirmDialog.vue";
import layoutController from "@/controllers/layout.controller";
import componentController from "@/controllers/component.controller";
import AbsoluteOverlay from "@/components/UI/AbsoluteOverlay.vue";
import store from "@/store";

export default {
	name: "LayoutConfigBox.vue",
	props: ["layoutData"],
	data: () => ({
		isOverlayVisible: false,
		timeoutId: null,
	}),
	methods: {
		deleteHandler: async function () {
			const ok = await this.$refs.deleteDialog.show({
				text: "delete-layout-alert",
				confirmBtnText: "delete",
				cancelBtnText: "cancel",
				confirmBtnColor: "error",
				cancelBtnColor: "primary",
			});

			if (!ok) return;

			const ok2 = await this.$refs.deleteDialog.show({
				text: this.$t("all-components-will-be-deleted"),
				confirmBtnText: this.$t("im-sure-delete"),
				cancelBtnText: this.$t("cancel"),
				confirmBtnColor: "error",
				cancelBtnColor: "primary",
			});

			if (!ok2) return;

			try {
				for (const compId of this.layoutData.components) {
					const componentData = await this.getComponentFromServer(compId);
					await this.deleteComponentWithDataFromServer(componentData);
				}
				await this.deleteLayout(this.layoutData);

				const newLayouts = store.state.additionalLayouts.filter((layout) => layout._id != this.layoutData._id);

				store.dispatch("REPLACE_ALL_LAYOUTS", newLayouts);

				this.isOverlayVisible = true;

				this.timeoutId = setTimeout(this.pushToGlobal, 5000);
			} catch (error) {
				console.log(error);
				this.$emit("errored");
			}
		},

		pushToGlobal: function () {
			if (!!this.timeoutId) clearTimeout(this.timeoutId);
			this.$router.push({
				name: "globalTemplate",
			});
		},
	},
	components: {
		TitledCard,
		ConfirmDialog,
		AbsoluteOverlay,
	},
	mixins: [layoutController, componentController],
};
</script>

<template>
	<titled-card :title="$t('component-settings')">
		<template>
			<absolute-overlay :isVisible="isOverlayVisible">
				<div class="flex items-center flex-col gap-4 pa-8 bg-white rounded-md shadow-lg">
					<v-icon color="success" size="100">mdi-check-circle-outline</v-icon>
					<h1 class="text-lg text-slate-500">
						{{$t('layout-removed-redirect-in-5sec')}}!
					</h1>
					<v-btn color="success" @click="pushToGlobal">
						<v-icon left> mdi-arrow-right-bold-outline </v-icon>
						{{$t('redirect-now')}}
					</v-btn>
				</div>
			</absolute-overlay>
			<v-card-text class="pa-2">
				<confirm-dialog ref="deleteDialog" />
				<v-text-field v-model="layoutData.name" disabled :label="$t('name')" />
			</v-card-text>
		</template>
		<template v-slot:actions>
			<v-btn color="error" @click="deleteHandler">{{$t('delete')}}</v-btn>
		</template>
	</titled-card>
</template>
