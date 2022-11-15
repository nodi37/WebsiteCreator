<script>
import ImageMiniature from "@/components/ComplexComponents/ImageMiniature.vue";

export default {
	name: "ArticleCard",
	props: ["articleData"],
	data: () => ({
		loadFinish: false,
	}),
	methods: {
		getFormatedDate(date) {
			return new Date(date).toLocaleString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			});
		},
	},
	components: {
		ImageMiniature,
	},
	mounted() {
        //Temp, i need to find better solution
		setTimeout(() => (this.loadFinish = true), 100);
	},
};
</script>

<template>
	<v-card
		@click="$emit('click')"
		:class="[
			this.loadFinish ? 'opacity-100' : 'opacity-0',
			'pa-2 flex flex-row gap-2 transition-all duration-1000',
		]"
	>
		<image-miniature v-if="!!articleData.mainImageId" :imgId="articleData.mainImageId" />
		<div class="flex flex-col items-start text-sm">
			<h3 class="text-slate-700 text-xl font-medium">{{ articleData.name }}</h3>
			<span class="text-slate-500">Date: {{ getFormatedDate(articleData.userDate) }}</span>
			<div class="text-slate-500">
				<span>Tags:&nbsp;</span>
				<span v-for="tag in articleData.tags" :key="articleData._id + '-' + tag">{{ tag }},&nbsp;</span>
			</div>
			<v-chip class="mt-auto" :color="articleData.isPublic ? 'success' : 'warning'" label small>
				{{ articleData.isPublic ? "public" : "not public" }}
			</v-chip>
		</div>
		<v-icon x-large class="ml-auto"> mdi-chevron-right </v-icon>
	</v-card>
</template>
