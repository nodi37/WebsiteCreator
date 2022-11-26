<script>
import ColorPicker from "./Elements/ColorPicker.vue";
export default {
	name: "ColorsList",
	props: ["colors", "value"],
	components: { ColorPicker },
};
</script>

<template>
	<div>
		<div v-for="(color, i) in colors" :key="color + '-' + i">
			<span class="mb-4">{{ $t(color.name) }}</span>
			<color-picker v-model="value[color.name].value" @input="$emit('modified', { type: 'color', name: color.name })" />
		</div>
	</div>
</template>