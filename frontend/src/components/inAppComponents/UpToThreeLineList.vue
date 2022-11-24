<script>
import BasicContainer from "./Misc/BasicContainer.vue";
import * as icons from "@mdi/js";

export default {
	name: "OneLineList",
	props: ["items","data", "header", "backgroundColor", "textColor"],
	computed: {
		itemsArr() {
			return JSON.parse(this.data);
		},
		icons() {
			return icons;
		},
	},
	methods: {
		openInNewTab(url) {
			if (!url) return;
			window.open(url, "_blank").focus();
		},
	},
	components: { BasicContainer },
};
</script>

<template>
	<basic-container
		:backgroundColor="backgroundColor.hexa"
		:style="{ color: textColor.hexa, fontFamily: 'Source Code Pro, monospace' }"
		class="py-8 px-4"
	>
		<div class="bg-slate-300/20 uppercase text-lg text-center font-semibold tracking-wider mb-2" v-if="header">
			<span class="cursor-default">{{ header }}</span>
		</div>
		<div>
			<ul class="flex flex-col gap-2">
				<li
					v-for="(item, i) in items"
					:key="i"
					:class="[
						!!item.href ? 'cursor-pointer hover:-translate-y-1' : 'cursor-default',
						'active:translate-y-0 transition-all duration-300 hover:duration-100 group',
					]"
					@click="openInNewTab(item.href)"
				>
					<div class="flex items-center">
						<svg v-if="item.icon" width="20px" height="20px" viewBox="0 0 25 25" class="mr-1 group-hover:animate-wiggle">
							<path :d="icons[item.icon]" :fill="textColor.hexa" />
						</svg>
						<span
							:class="[
								item.highlighted ? 'text-4xl' : '',
								item.lineTwo || item.lineThree ? 'font-bold' : 'font-normal',
							]"
						>
							{{ item.lineOne }}
						</span>
					</div>
					<div :class="!!item.icon ? 'pl-6' : 'pl-1'" class="flex flex-col">
						<span v-if="item.lineTwo" class="font-thin italic">{{ item.lineTwo }}</span>
						<span class="font-thin italic text-xs" v-if="item.lineThree">{{ item.lineThree }}</span>
					</div>
				</li>
			</ul>
		</div>
	</basic-container>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,300;0,400;1,300&display=swap");
</style>
