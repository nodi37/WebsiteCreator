<script>
export default {
	name: "DoubleStateSnackbar",
	props: ["visible", "text", "lnrPrgStepsCount", "lnrPrgCurrStep", "crclrPrgStepsCount", "crclrPrgCurrStep"],
	data: () => ({
		isVisible: false,
		taskFinished: false,
	}),
	computed: {
		linearProgressState() {
			return Math.ceil((this.lnrPrgCurrStep / this.lnrPrgStepsCount) * 100);
		},
		circularProgressState() {
			return Math.ceil((this.crclrPrgCurrStep / this.crclrPrgStepsCount) * 100);
		},
	},
	watch: {
		visible: function (nV) {
			if (nV) {
				this.isVisible = true;
				this.taskFinished = false;
			} else {
				this.taskFinished = true;
				setTimeout(() => {
					this.isVisible = false;
				}, 2500);
			}
		},
	},
};
</script>
<template>
	<v-snackbar transition="scale-transition" origin="center center" v-model="isVisible" timeout="-1">
		<div class="d-flex gap-2">
			<v-icon color="green" large v-if="taskFinished">
				mdi-check
			</v-icon>
			<v-progress-circular v-else :value="circularProgressState" width="3" size="30" color="green"></v-progress-circular>
			<div class="d-flex flex-col gap-1 flex-1">
				<span>{{ text }}</span>
				<v-progress-linear
					rounded
					:value="linearProgressState"
					:color="taskFinished ? 'green' : 'accent'"
				></v-progress-linear>
			</div>
		</div>
		<template v-slot:action="{ attrs }">
			<v-btn color="green" text v-bind="attrs" @click="isVisible = false" :disabled="!taskFinished">
				{{ $t("close") }}
			</v-btn>
		</template>
	</v-snackbar>
</template>
