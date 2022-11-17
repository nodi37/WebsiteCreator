<script>
import AbsoluteOverlay from "@/components/UI/AbsoluteOverlay.vue";
export default {
	name: "ErrorOverlay",
	props: ["isVisible"],
	components: { AbsoluteOverlay },
	methods: {
		reload() {
			window.location.reload();
		},
	},
};
</script>

<template>
	<absolute-overlay :isVisible="isVisible">
		<div class="flex items-center flex-col gap-4 pa-8 bg-white rounded-md shadow-lg">
			<v-icon color="error" size="100">mdi-alert-outline</v-icon>
			<h1 class="text-lg text-slate-500">{{$t('error-refresh-page')}}!</h1>
			<v-btn color="success" @click="reload">
				<v-icon left> mdi-reload </v-icon>
				{{$t('refresh')}}
			</v-btn>
		</div>
	</absolute-overlay>
</template>
