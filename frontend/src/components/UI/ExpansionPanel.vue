<script>
export default {
	name: "ExpansionPanel",
	props: ["header", "disabled"],
};
</script>

<template>
	<v-expansion-panels :disabled="disabled">
		<v-expansion-panel>
			<v-expansion-panel-header>{{ header }}</v-expansion-panel-header>
			<v-expansion-panel-content>
				<slot> </slot>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>


