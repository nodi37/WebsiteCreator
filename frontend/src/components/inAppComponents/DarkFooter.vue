<script>
import statsService from "@/services/stats.service";
import store from "@/store";

export default {
  name: "DarkFooter",
  data: () => ({
    visitsCount: 0,
  }),
  computed: {
    pageTitle() {
      return store.state.pageTitle;
    },
    currentYear() {
      return new Date().getFullYear();
    },
  },
  mounted: async function () {
	const data = await this.getStatByNameRequest("visitsCount");
    this.visitsCount = data.value;
  },
  mixins: [statsService],
};
</script>

<template>
  <footer class="bg-slate-900 py-8 text-center select-none">
    <span class="block text text-slate-500 mb-2"
      >Nasza strona została odwiedzona przez {{visitsCount}} gości.</span
    >
    <span class="block text text-sm text-slate-700"
      >{{ pageTitle }}@{{ currentYear }}</span
    >
    <a class="text text-[10px] text-slate-700" href="mailto:nodi37@o2.pl"
      >Wykonanie Norbert B.</a
    >
  </footer>
</template>
