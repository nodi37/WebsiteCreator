<script>
import BasicContainer from "./Misc/BasicContainer.vue";
export default {
  components: { BasicContainer },
  name: "CompetitionRules",
  props: ["items", "header", "note"],
};
</script>
<template>
  <basic-container class="px-2">
    <div class="text-slate-700 bg-slate-200 p-4 rounded font-sans font-semibold select-none">
        <h1 class="text-center mb-4">{{ header.value }}</h1>
        <ol class="text-left text-sm mb-1">
            <li v-for="(item, i) in items.value" :key="'comp-item-'+i">
                {{i+1}}. {{item.content.value}}
            </li>
        </ol>
        <span class="text-sm text-slate-400">{{ note.value }}</span>
    </div>
  </basic-container>
</template>
