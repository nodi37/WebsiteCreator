<script>
export default {
  name: "BooleansList",
  props: ["booleans", "value"],
};
</script>

<template>
  <v-list flat>
    <v-list-item v-for="(bool, i) in booleans" :key="bool + '-' + i">
      <v-switch :label="$t(bool.name)" v-model="value[bool.name].value"
      @change="$emit('modified', { type: 'boolean', name: bool.name })"/>
    </v-list-item>
  </v-list>
</template>



