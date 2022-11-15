<script>
export default {
	name: "DatePicker",
	data: () => ({
		date: "",
	}),
	props: ["visible"],
	methods: {
		emitDate: function () {
			const [year, month, day] = this.date.split("-");
			const dateText = `${day}/${month}/${year}`;
			this.value = dateText
			this.visibleModel = false;
		},
	},
	computed: {
		visibleModel: {
			set: function () {
				this.$emit("close");
			},
			get: function () {
				return this.visible;
			},
		},
		value: {
			set: function (value) {
				this.$emit("input", value);
			},
			get: function () {
				return this.value;
			},
		},
	},
};
</script>

<template>
	<div>
		<v-dialog width="300px" v-model="visibleModel" persistent>
			<v-date-picker v-model="date" @change="emitDate" scrollable />
		</v-dialog>
	</div>
</template>
