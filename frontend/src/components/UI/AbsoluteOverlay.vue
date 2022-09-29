<template>
	<v-overlay :value="isVisible">
		<slot>

        </slot>
	</v-overlay>
</template>

<script>
export default {
	name: "AbsoluteOverlay",
    props: ['isVisible']
};
</script>
