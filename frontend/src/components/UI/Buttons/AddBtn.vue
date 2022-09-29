<script>
export default {
    name: 'AddBtn',
    props: ['disabled'],
    methods: {
      emitClick: function() {
        if (this.disabled) return;
        this.$emit('click');
      }
    }
}
</script>
<template>
  <div class="flex h-full justify-center" @click="emitClick">
    <v-icon :disabled="disabled" x-large>mdi-plus</v-icon>
  </div>
</template>



