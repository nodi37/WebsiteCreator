<script>
import ImageLoader from "./ImageLoader.vue";

export default {
  name: "ArticleCard",
  props: ["name", "href", "mainImageId", "date"],
  methods: {
    createLocalDateString(dateObj) {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return new Date(dateObj).toLocaleDateString("pl-PL", options);
    },
    goToHref(href) {
      console.log(href);
    },
  },
  components: { ImageLoader },
};
</script>

<template>
  <div
    class="
      rounded
      bg-white
      shadow
      p-2
      sm:p-4
      flex flex-col
      gap-2
      hover:scale-[1.004]
      transition-all
      select-none
    "
  >
    <figure class="h-72 max-h-72 rounded overflow-hidden">
      <image-loader
        v-if="!!mainImageId"
        class="block h-full w-full object-cover"
        :imageId="mainImageId"
      />
    </figure>
    <div class="text-center mb-4">
      <h3
        v-if="!!name"
        class="text-2xl font-Roboto font-medium italic text-green-900 mb-2"
      >
        {{ name }}
      </h3>
      <span class="block h-[1px] w-1/2 sm:w-1/4 mx-auto bg-green-400"
        >&nbsp;</span
      >
      <span v-if="!!date" class="text-xs text-slate-500">
        {{ createLocalDateString(date) }}
      </span>
    </div>
    <button
      class="
        block
        mx-auto
        mt-auto
        py-1
        px-4
        w-40
        rounded-xl
        text-sm text-green-600
        hover:text-white
        uppercase
        bg-slate-200
        hover:bg-green-600
        transition-all
        cursor-pointer
      "
      @click="goToHref(href)"
    >
      Czytaj więcej
    </button>
  </div>
</template>

