<script>
import store from "@/store";
import PageGrid from "@/components/UI/PageGrid.vue";
import ErrorOverlay from "../ComplexComponents/ErrorOverlay.vue";
import AddLayoutForm from "../ComplexComponents/AddLayoutForm.vue";

export default {
  name: "AddSubpageRoute",
  data: () => ({
    isError: false,
  }),
  components: {
    PageGrid,
    ErrorOverlay,
    AddLayoutForm,
  },
  mounted() {
    store.dispatch("SET_NEW_TOOLBAR_TITLE", "add-page-route");
  },
};
</script>

<template>
  <page-grid>
    <error-overlay :isVisible="isError" />
    <add-layout-form @error="isError = true" />
  </page-grid>
</template>
