<script>
import ImageLoader from "./Misc/ImageLoader.vue";
export default {
  name: "LogoBar",
  props: ["logoImg", "items"],
  methods: {
    goToIndex() {
      if (this.$route.fullPath.length < 2) return;
      this.$router.push({ name: "main" });
    },
    goTo(href) {
      console.log(href);
    },
  },
  computed: {
    currentLayout() {
      return this.$route.path.slice(1).toLowerCase();
    },
  },
  components: { ImageLoader },
};
</script>
<template>
  <div class="w-full shadow relative">
    <image-loader
      @click="goToIndex"
      :imageId="logoImg"
      class="
        absolute
        left-4
        top-2
        xl:top-5
        xl:left-40
        z-20
        h-28
        w-28
        xl:h-36 xl:w-36
        rounded-lg
        cursor-pointer
      "
    />
    <div
      class="mx-auto h-12 max-w-7xl flex justify-end items-center gap-x-1 px-4"
    >
      <div class="h-full">
        <ul class="flex gap-4 h-full">
          <li
            v-for="(item, i) in items"
            :key="item + i"
            @click="
              currentLayout !== item.href.toLowerCase() ? goTo(item.href) : ''
            "
            class="
              flex
              justify-center
              items-center
              h-full
              text-lime-900
              hover:text-green-500
              active:text-lime-700
              text-xs
              font-Kanit font-medium
              uppercase
              tracking-wider
              cursor-pointer
              select-none
              transition-all
              hover:border-b
              border-current
            "
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
