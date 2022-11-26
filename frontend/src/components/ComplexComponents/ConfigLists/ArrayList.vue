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

      for (const valueArr in valuesArrays) {
        for (const value of valuesArrays[valueArr]) {
          newItem[value.name] = { type: valueArr, value: "" };
        }
      }
      this.emitChange();
      this.value[this.arrayModel[0].name].value.push(newItem);
    },

    removeItem(itemIndex) {
      const oldElement = this.value[this.arrayModel[0].name].value.splice(
        itemIndex,
        1
      )[0];

      for (const prop in oldElement) {
        const { type, value } = oldElement[prop];
        if (type == "image" && value.length == 24) {
          this.$emit("toremove", { type: "image", id: value });
        }
      }
      this.$emit('itemDeleted', {arrName:this.arrayModel[0].name, itemIndex: itemIndex});
      this.emitChange();
    },

    emitChange(e) {
      this.$emit("modified", {
        type: "array",
        name: this.arrayModel[0].name,
        element: e,
      });
    },
  },
  components: { TextsList, ImagesList, BooleansList },
};
</script>

<template>
  <div>
    <div v-for="array in arrayModel" :key="'array' + array.name">
      <div
        v-for="(item, i) in value.items.value"
        :key="array.name + '-item-' + i"
        class="pt-10 pa-1 mb-4 rounded border relative border-slate-300"
      >
        <v-btn
          class="absolute top-1 right-1"
          color="error"
          @click="removeItem(i)"
          >{{ $t("delete") }}</v-btn
        >

        <texts-list
          v-model="value[array.name].value[i]"
          @modified="(e) => emitChange({ index: i, value: e })"
          :texts="array.values.text"
        />
        <images-list
          v-model="value[array.name].value[i]"
          @modified="(e) => emitChange({ index: i, value: e })"
          @toremove="(e) => $emit('toremove', e)"
          :images="array.values.image"
        />
        <booleans-list
          v-model="value[array.name].value[i]"
          @modified="(e) => emitChange({ index: i, value: e })"
          :booleans="array.values.boolean"
        />
      </div>
      <v-btn class="w-full" color="accent" @click="pushNewItem">{{
        $t("add-new")
      }}</v-btn>
    </div>
  </div>
</template>