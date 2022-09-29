<script>
export default {
  name: "TitleDescriptionCard",
  props: ["title", "description"],
};
</script>
<template>
  <v-card class="my-6" @click="$emit('click')">
    <v-toolbar color="primary white--text">{{ title }}</v-toolbar>
    <v-card-text>
      <div>{{ description }}</div>
    </v-card-text>
  </v-card>
</template>