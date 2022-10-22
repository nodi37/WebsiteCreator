<script>
export default {
	name: "JSONEditor",
	props: ["value", "json"],
	computed: {
		model: {
			get: function () {
				return this.value;
			},
			set: function (newValue) {
				this.$emit("input", newValue);
			},
		},
		isValidJson() {
			try {
				JSON.parse(this.value);
			} catch (e) {
				return false;
			}
			return true;
		},
	},
};
</script>
<template>
	<v-textarea
		outlined
		rows="2"
		:label="json.name"
		:error="!isValidJson"
        :success="isValidJson"
		auto-grow
		v-model="model"
		prepend-icon="mdi-database"
		@input="$emit('modified', json.name)"
	></v-textarea>
</template>
