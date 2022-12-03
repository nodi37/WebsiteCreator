<script>
import BasicContainer from "./Misc/BasicContainer.vue";
import ImageLoader from "./Misc/ImageLoader.vue";

export default {
  components: { ImageLoader, BasicContainer },
  name: "ParnertsLogos",
  props: ["items", "header"],
  methods: {
    openLink(href) {
        if(href.length<8) return;
        window.open(href, '_blank');
    }
  }
};
</script>

<template>
  <basic-container
    class="py-5 text-center select-none mb-16"
    backgroundColor="#fafafa"
  >
    <h3 v-if="!!header.value" class="mb-8 text-green-400">
      {{ header.value }}
    </h3>
    <div class="flex flex-wrap sm:flex-nowrap px-2 gap-2 justify-between w-screen relative">
      <figure
        class="flex-initial w-5/12 h-24 sm:h-24 sm:w-60 overflow-hidden hover:scale-[1.2] transition-all cursor-pointer"
        v-for="(item, index) in items.value"
        :key="'logo-' + index"
        @click="openLink(item.href.value)"
      >
        <image-loader
          class="object-contain h-full w-full"
          :imageId="item.logo.value"
        />
      </figure>

    </div>
  </basic-container>
</template>



