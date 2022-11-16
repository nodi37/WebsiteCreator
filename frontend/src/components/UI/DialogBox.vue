<script>
export default {
  name: "DialogBox",
  props: ["value", "title"],
  computed: {
    dV: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
<template>
  <v-dialog v-model="dV" scrollable max-width="500">
    <v-card max-height="80vh">
      <v-card-title>{{ title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text> 
        <slot> </slot>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
