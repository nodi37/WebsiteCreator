<script>
import TitledCard from "@/components/UI/Cards/TitledCard.vue";
import TextsList from "@/components/ComplexComponents/ConfigLists/TextsList.vue";
import ImagesList from "@/components/ComplexComponents/ConfigLists/ImagesList.vue";
import BooleansList from "@/components/ComplexComponents/ConfigLists/BooleansList.vue";
import ExpansionPanel from "@/components/UI/ExpansionPanel.vue";

export default {
	name: "ComponenConfigCard",
	props: ["document", "model", "actionsDisabled", "queueBusy"],
	data: () => ({
		isModified: false,
	}),
	methods: {
		pushModified(prop) {
			this.isModified = true;
			this.$emit("modified");
			if (!this.document.modifiedProps) {
				this.document.modifiedProps = [];
			}

			if (!this.document.modifiedProps.includes(prop)) {
				this.document.modifiedProps.push(prop);
			}
		},
		pushToRemove(prop) {
			if (!this.document.propsToRemove) {
				this.document.propsToRemove = [];
			}

			if (!this.document.propsToRemove.includes(prop)) {
				this.document.propsToRemove.push(prop);
			}
		},
	},
	computed: {
		toSave: function () {
			return !this.document._id || this.isModified;
		},
	},
	watch: {
		document() {
			this.isModified = false;
		},
	},
	components: {
		TitledCard,
		TextsList,
		ImagesList,
		BooleansList,
		ExpansionPanel,
	},
};
</script>

<template>
	<titled-card :title="model.name">
		<expansion-panel :disabled="queueBusy && !toSave" header="settings">
			<template v-if="model.props.texts">
				<texts-list :texts="model.props.texts" v-model="document.props" @modified="pushModified" />
				<v-divider />
			</template>

			<template v-if="model.props.images">
				<images-list
					:images="model.props.images"
					v-model="document.props"
					@modified="pushModified"
					@toremove="pushToRemove"
				/>
				<v-divider />
			</template>

			<template v-if="model.props.booleans">
				<booleans-list :booleans="model.props.booleans" v-model="document.props" @modified="pushModified" />
			</template>
		</expansion-panel>
		<v-alert v-if="toSave" class="my-0 mt-2 mr-auto" type="error" elevation="4" icon="mdi-alert">
			not-saved!
		</v-alert>
		<template v-slot:actions>
			<v-btn @click="$emit('moveUp')" :disabled="!document._id || actionsDisabled || queueBusy" color="secondary">
				Move Up
			</v-btn>
			<v-btn @click="$emit('delete')" :disabled="actionsDisabled || (queueBusy && !toSave)" color="error">
				Delete
			</v-btn>
			<v-btn
				@click="$emit('save')"
				:disabled="!toSave || (queueBusy && !toSave) || actionsDisabled"
				color="success"
			>
				Save
			</v-btn>
		</template>
	</titled-card>
</template>
