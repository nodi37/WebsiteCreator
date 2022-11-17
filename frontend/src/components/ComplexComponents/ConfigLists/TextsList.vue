<script>
export default {
  name: "TextsList",
  props: ["texts", "value"],
};
</script>

<template>
  <v-list flat>
    <v-list-item v-for="(text, i) in texts" :key="text + '-' + i">
      <v-textarea
        clearable
        filled
        rows="2"
        :label="$t(text.name)"
        auto-grow
        v-model="value[text.name]"
        prepend-icon="mdi-text-box-edit-outline"
        @input="$emit('modified', text.name)"
      ></v-textarea>
    </v-list-item>
  </v-list>
</template>