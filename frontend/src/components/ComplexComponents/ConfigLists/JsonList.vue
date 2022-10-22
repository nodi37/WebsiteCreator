<script>
import JsonEditor from "./Elements/JSONEditor.vue";
export default {
	name: "JsonList",
	props: ["jsons", "value"],
	components: { JsonEditor },
};
</script>

<template>
	<v-list flat>
		<v-list-item v-for="(json, i) in jsons" :key="json.name + '-' + i">
			<json-editor :json="json" v-model="value[json.name]" @input="$emit('modified', json.name)" />
		</v-list-item>
	</v-list>
</template>
