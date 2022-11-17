<script>
export default {
	name: "ShapedList",
	props: ["header", "items"],
};
</script>
<template>
	<v-list shaped>
		<v-subheader v-if="header">{{ $t(header) }}</v-subheader>
		<v-list-item-group color="primary">
			<v-list-item
				v-for="(item, i) in items"
				:key="i"
				:to="item.path"
			>
				<v-list-item-icon>
					<v-icon v-text="item.icon"></v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title v-text="$t(item.text)"></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</template>
