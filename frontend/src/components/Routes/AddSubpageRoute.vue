<script>
import store from "@/store";

export default {
	name: "AddSubpageRoute",
	mounted() {
		store.dispatch("SET_NEW_TOOLBAR_TITLE", this.$t("articles"));
	},
};
</script>

<template>
	<p>xD</p>
</template>
