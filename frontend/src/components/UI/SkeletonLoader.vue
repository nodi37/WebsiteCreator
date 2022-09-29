<script>
import FadeTransition from "@/components/UI/Transitions/FadeTransition.vue";
export default {
	name: "SkeletonLoader",
	props: ["isLoading"],
	components: { FadeTransition },
};
</script>

<template>
	<fade-transition>
		<v-skeleton-loader
			v-if="isLoading"
			elevation="5"
			class="pa-4"
			type="image, table-row, image, table-row, image"
		/>
	</fade-transition>
</template>
