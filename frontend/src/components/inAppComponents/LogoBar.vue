<script>
import ImageLoader from "./Misc/ImageLoader.vue";
export default {
  name: "LogoBar",
  props: ["logoImg", "items", "openInNewTab"],
  methods: {
    goToIndex() {
      if (this.$route.fullPath.length < 2) return;
      this.$router.push({ name: "main" });
    },
    goTo(href) {
      if (this.currentLayout == href.toLowerCase()) return;
      if (href.includes("http")) {
        window.open(href, this.openInNewTab.value ? "_blank" : "_self");
      } else {
        this.$router.push("/" + href.toLowerCase());
      }
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
      :imageId="logoImg.value"
      class="
        absolute
        left-4
        top-2
        xl:top-5 xl:left-40
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
        <ul class="hidden sm:flex gap-4 h-full">
          <li
            v-for="(item, i) in items.value"
            :key="item + i"
            @click="goTo(item.href.value)"
            :class="[
              'flex justify-center items-center h-full',
              'text-lime-900  hover:text-green-500 active:text-lime-700 text-xs font-Kanit font-medium uppercase tracking-wider select-none',
              'cursor-pointer transition-all border-current hover:border-b',
              item.href.value.toLowerCase() == currentLayout
                ? 'text-green-500 active:text-green-500 border-b'
                : '',
            ]"
          >
            {{ item.name.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
