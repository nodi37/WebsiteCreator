<script>
export default {
	name: "ColorContainer",
	props: ["backgroundColor"],
};
</script>

<template>
	<section :style="{ backgroundColor: backgroundColor }">
		<div class="mx-auto max-w-7xl">
			<slot></slot>
		</div>
	</section>
</template>
