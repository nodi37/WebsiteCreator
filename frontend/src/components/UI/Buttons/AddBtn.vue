<script>
export default {
	name: "AddBtn",
	props: ["disabled"],
	methods: {
		emitClick: function () {
			if (this.disabled) return;
			this.$emit("click");
		},
	},
};
</script>
<template>
	<!-- <div class="flex h-full justify-center cursor-pointer hover:-translate-y-1" > -->
	<v-btn :disabled="disabled" x-large color="blue-grey" @click="emitClick">
		<span class="text-white"> add-new </span>
	</v-btn>
	<!-- </div> -->
</template>
