<template>
	<transition name="fade">
		<slot> </slot>
	</transition>
</template>

<script>
export default {
	name: "FadeTransition",
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
