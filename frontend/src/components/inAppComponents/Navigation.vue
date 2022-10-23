<script>
export default {
	name: "Navigation",
	props: ["data"],
	data: () => ({
		menuVisible: false,
	}),
	computed: {
		items() {
			return JSON.parse(this.data);
		},
		currentLayout() {
			return this.$route.path.slice(1);
		},
	},
	methods: {
		goTo(layoutName) {
			if (layoutName == this.currentLayout) return;
			this.$router.push("/" + layoutName);
		},
	},
};
</script>

<template>
	<nav>
		<span @click="menuVisible = !menuVisible" class="flex justify-center items-center md:hidden absolute top-5 right-5 h-14 w-14 rounded-full shadow transition cursor-pointer bg-white hover:bg-slate-400 hover:text-white text-lg font-bold">&equiv;</span>
		<ul
			:class="[
				!menuVisible ? 'hidden' : 'flex',
				'md:flex justify-center items-center md:justify-start flex-col absolute h-full w-full md:relative md:flex-row gap-1 bg-black md:bg-transparent',
			]"

			@click="menuVisible = false"
		>
			<li
				v-for="(item, i) in items"
				:key="item + '-' + i"
				:class="[
					item.layout == currentLayout ? 'bg-blue-500' : '',
					'p-2 w-40 md:flex-1 cursor-pointer bg-sky-900 hover:bg-blue-500 active:bg-sky-700 text-white text-center uppercase font-mono font-semibold tracking-wide transition',
				]"
				@click="goTo(item.layout)"
			>
				{{ item.buttonText }}
			</li>
		</ul>
	</nav>
</template>
