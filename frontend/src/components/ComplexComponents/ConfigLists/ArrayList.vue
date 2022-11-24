<script>
import TextsList from "@/components/ComplexComponents/ConfigLists/TextsList.vue";
import ImagesList from "@/components/ComplexComponents/ConfigLists/ImagesList.vue";
import BooleansList from "@/components/ComplexComponents/ConfigLists/BooleansList.vue";

export default {
  name: "ArrayList",
  props: ["arrayModel", "value"],
  data: () => ({
    test: {},
  }),
  methods: {
    pushNewItem() {
      const valuesArrays = this.arrayModel[0].values;
      const newItem = {};
      for(const valueArr in valuesArrays) {
        for(const value of valuesArrays[valueArr]) {
          newItem[value.name] = "";
        };
      };
      this.emitChange();
      this.value[this.arrayModel[0].name].push(newItem);
    },

    removeItem(itemIndex) {
      this.value[this.arrayModel[0].name].splice(itemIndex, 1);
      this.emitChange();
    },

    emitChange() {
      this.$emit('modified', this.arrayModel[0].name);
    }
  },
  components: { TextsList, ImagesList, BooleansList },
};
</script>

<template>
  <div>
    <div v-for="array in arrayModel" :key="'array' + array.name">
      <div
        v-for="(item, i) in value.items"
        :key="array.name + '-item-' + i"
        class="pt-10 pa-1 mb-4 rounded border relative border-slate-300"
      >
        <v-btn class="absolute top-1 right-1" color="error" @click="removeItem(i)">{{$t('delete')}}</v-btn>

        <texts-list v-model="value[array.name][i]" @modified="emitChange" :texts="array.values.texts" />
        <images-list v-model="value[array.name][i]" @modified="emitChange" :images="array.values.images" />
        <booleans-list v-model="value[array.name][i]" @modified="emitChange" :booleans="array.values.booleans" />
      </div>
      <v-btn class="w-full" color="accent" @click="pushNewItem">{{$t('add-new')}}</v-btn>
    </div>
  </div>
</template>