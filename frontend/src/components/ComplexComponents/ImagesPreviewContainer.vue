<script>
export default {
	name: "ImagesPreviewContainer",
	props: ["toSave"],
};
</script>

<template>
	<div
		:class="['flex flex-wrap gap-2 mb-4 pa-2', toSave? 'pt-8 relative border-dotted border-2 border-yellow-500': '']"
	>
		<span v-if="toSave" class="absolute top-1 left-2 font-bold uppercase text-sm text-gray-500">to-save:</span>
		<slot></slot>
	</div>
</template>
