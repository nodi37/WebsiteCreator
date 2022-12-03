<script>
import BasicContainer from "./Misc/BasicContainer.vue";
export default {
  components: { BasicContainer },
  name: "CompetitionComponent",
  props: ["header", "content", "date"],
  computed: {
    dateObj() {
      const dateArr = this.date.value.split("/");
      const [day, month, year] = dateArr;
      return new Date(`${year} ${month} ${Number(day) + 1}`);
    },
    dateString() {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return this.dateObj.toLocaleDateString("pl-PL", options);
    },
    expired() {
      const compExpDate = this.dateObj.getTime();
      const today = new Date().getTime();
      return compExpDate < today;
    },
  },
};
</script>

<template>
  <basic-container class="px-2 mb-6 -mt-2" backgroundColor="#fafafa">
    <div
      :class="[
        expired ? 'opacity-40' : '',
        'bg-white rounded border p-4 text-gray-700 hover:opacity-100 transition-all cursor-default select-none',
      ]"
    >
      <div class="flex justify-between mb-4 pb-2 border-b text-xl font-medium">
        <h3>{{ header.value }}</h3>
        <p>{{ dateString }}</p>
      </div>
      <p class="select-text">{{ content.value }}</p>
    </div>
  </basic-container>
</template>

