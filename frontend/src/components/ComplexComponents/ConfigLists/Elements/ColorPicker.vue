<script>
export default {
	name: "ColorPicker",
	props: ["value"],
	computed: {
		model: {
			get: function () {
				return this.value;
			},
			set: function (newValue) {
				this.$emit("input", newValue);
			},
		},
	},
};
</script>
<template>
	<v-color-picker
		:value="model"
		@input="model = $event"
		hide-mode-switch
		mode="hexa"
		dot-size="20"
		elevation="3"
		class="mb-4"
	/>
</template>
