<script>
export default {
  name: "BooleansList",
  props: ["booleans", "value"],
};
</script>

<template>
  <v-list flat>
    <v-list-item v-for="(bool,i) in booleans" :key="bool + '-' + i">
      <v-switch :label="bool.name" v-model="value[bool.name]" @change="$emit('modified', bool.name)"/>
    </v-list-item>
  </v-list>
</template>



