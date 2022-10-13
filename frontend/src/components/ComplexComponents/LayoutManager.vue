<script>
import PageGrid from "@/components/UI/PageGrid.vue";
import ComponentHolder from "@/components/UI/ComponentHolder.vue";
import DialogBox from "@/components/UI/DialogBox.vue";
import TitleDescriptionCard from "@/components/UI/Cards/TitleDescriptionCard.vue";
import AddBtn from "@/components/UI/Buttons/AddBtn.vue";
import ComponentConfigCard from "@/components/ComplexComponents/ComponentConfigCard.vue";
import ConfirmDialog from "@/components/UI/ConfirmDialog.vue";
import ErrorOverlay from "@/components/ComplexComponents/ErrorOverlay.vue";
import SkeletonLoader from "@/components/UI/SkeletonLoader.vue";
import DoubleStateSnackbar from "@/components/UI/DoubleStateSnackbar.vue";

import componentManagement from "@/helpers/componentManagement";
import LayoutConfigBox from "./LayoutConfigBox.vue";

export default {
	name: "LayoutManager",
	props: ["layoutName"],
	data: function () {
		return {
			addComponentsDialogVisible: false,
			queueBusy: false,

			//Snackbar states
			snackBarVisible: false,
			snackBarStates: {
				sCurr: 0,
				sState: 0,
				mainCurr: 0,
				mainState: 0,
				text: "",
			},
		};
	},
	methods: {
		triggerSelectionDialog() {
			this.addComponentsDialogVisible = true;
		},

		addComponentToLayout(component) {
			this.queueBusy = true;
			this.addComponentsDialogVisible = false;
			this.layoutComponents.push({
				name: component.name,
				order: this.layoutComponents.length,
				props: {},
			});
		},

		onCompModifiedHandler() {
			this.queueBusy = true;
		},

		saveBtnHanler: async function (doc) {
			this.snackBarVisible = true;
			if (!doc._id) {
				await this.saveNewComponent(doc);
			} else {
				await this.updateComponent(doc);
			}
			this.queueBusy = false;
			this.snackBarVisible = false;
		},

		deleteBtnHandler: async function (doc) {
			const ok = await this.$refs.confirmDeletionDialog.show({
				text: "are-you-sure",
				confirmBtnText: "delete",
				cancelBtnText: "cancel",
				confirmBtnColor: "error",
				cancelBtnColor: "primary",
			});

			if (!ok) return;
			this.snackBarVisible = true;
			await this.deleteComponent(doc);
			this.snackBarVisible = false;
			this.queueBusy = false;
		},

		setSnackBarMainState: function (newValues) {
			this.snackBarStates.mainCurr = newValues.current;
			this.snackBarStates.mainState = newValues.count;
			const counter = newValues.count > 1 ? `${newValues.current}/${newValues.count}...` : "";
			this.snackBarStates.text = `${this.$t(newValues.text)} ${counter}`;
		},
	},
	watch: {
		//Looks when layout name is loaded and runs loader
		layoutName(nV) {
			this.loadData(nV);
		},

		//Emits error
		isError(nV) {
			if (nV) this.$emit("error");
		},

		//Snackbar States
		chunkingSystemState: {
			handler(nV) {
				this.snackBarStates.sCurr = nV.current;
				this.snackBarStates.sState = nV.count;
			},
			deep: true,
		},
		imageUploadState: {
			handler: function (nV) {
				this.setSnackBarMainState(nV);
			},
			deep: true,
		},
		taskState: {
			handler: function (nV) {
				this.setSnackBarMainState(nV);
			},
			deep: true,
		},
	},
	components: {
		PageGrid,
		ComponentHolder,
		DialogBox,
		TitleDescriptionCard,
		AddBtn,
		ComponentConfigCard,
		ConfirmDialog,
		ErrorOverlay,
		SkeletonLoader,
		DoubleStateSnackbar,
		LayoutConfigBox,
	},
	mixins: [componentManagement],
};
</script>

<template>
	<div class="w-full flex flex-col gap-6">
		<skeleton-loader :isLoading="isLoading" />
		<template v-if="isLoaded">
			
			<!-- Layout settings -->
			<layout-config-box v-if="!layoutData.isRequired" :layoutData="layoutData" @errored="$emit('error')" />

			<!-- Components -->
			<component-config-card
				v-for="(doc, i) in componentsByOrder"
				:key="'top-' + i"
				:order="i"
				:document="doc"
				:actionsDisabled="taskInProgress"
				:queueBusy="queueBusy"
				:model="getComponentModel(doc.name)"
				@save="saveBtnHanler(doc)"
				@delete="deleteBtnHandler(doc)"
				@moveUp="moveUpComponent(doc)"
				@modified="onCompModifiedHandler()"
			/>

			<!-- Plus button for components -->
			<component-holder :class="queueBusy ? 'opacity-50' : ''">
				<add-btn :disabled="queueBusy" v-on:click="triggerSelectionDialog()" />
			</component-holder>

			<!-- State snackbar -->
			<double-state-snackbar
				:text="snackBarStates.text"
				:visible="snackBarVisible"
				:crclrPrgCurrStep="snackBarStates.sCurr"
				:crclrPrgStepsCount="snackBarStates.sState"
				:lnrPrgCurrStep="snackBarStates.mainCurr"
				:lnrPrgStepsCount="snackBarStates.mainState"
			/>

			<!-- Confirmation dialog -->
			<confirm-dialog ref="confirmDeletionDialog" />

			<!-- Dialog box to choose new component -->
			<dialog-box v-model="addComponentsDialogVisible" title="select-component">
				<title-description-card
					v-for="(c, i) in componentsModels"
					:key="i"
					:title="c.name"
					:description="c.description"
					@click="addComponentToLayout(c)"
				/>
			</dialog-box>
		</template>
	</div>
</template>
