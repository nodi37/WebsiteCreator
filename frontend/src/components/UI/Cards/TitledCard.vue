<script>
export default {
	name: "TitledCard",
	props: ["title"],
};
</script>
<template>
	<v-card>
		<v-toolbar color="primary white--text">{{ title }}</v-toolbar>
		<v-card-text class="pa-2">
			<slot>
				<!-- Here will be content -->
			</slot>
		</v-card-text>
		<v-card-actions class="justify-end">
			<slot name="actions">
				<!-- Here will be buttons -->
			</slot>
		</v-card-actions>
	</v-card>
</template>
