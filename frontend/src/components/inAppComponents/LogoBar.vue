<script>
import ImageLoader from "./Misc/ImageLoader.vue";
export default {
  name: "LogoBar",
  props: ["logoImg", "items", "openInNewTab"],
  data: () => ({
    menuVisible: false,
  }),
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
      this.menuVisible = false;
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
<!-- Add fixed prop -->
  <div class="w-full shadow md:relative fixed bg-white z-20">
    <image-loader
      @click="goToIndex"
      :imageId="logoImg.value"
      fixedSize="mini"
      class="
        absolute
        left-4
        top-2
        xl:top-5 xl:left-40
        h-28
        w-28
        z-20
        xl:h-36 xl:w-36
        rounded-lg
        cursor-pointer
      "
    />
    <div
      class="mx-auto h-12 max-w-7xl flex justify-end items-center gap-x-1 px-4"
    >
      <div class="h-full flex justify-end items-center md:block">
        <span
          @click="menuVisible = !menuVisible"
          :class="[
          'fixed grid grid-cols-3 grid-rows-3 group cursor-pointer md:hidden z-50 transition-all',
          menuVisible ? 'gap-0' : 'gap-1'
          ]
         
          "
        >
          <span
            v-for="index in 9"
            :key="'menu-' + index"
            :class="[
            'h-[6px] w-[6px] bg-green-900 group-hover:bg-green-500 transition-all',
            menuVisible ? '' : 'rounded-xl'
            ]"
          ></span>
        </span>

        <ul
          :class="[
          'flex',
            menuVisible
              ? 'fixed top-0 left-0 h-screen w-screen justify-center items-center flex-col text-lg'
              : 'fixed top-0 left-full h-screen w-screen justify-center items-center flex-col text-lg',
              'md:relative md:left-0 md:h-full md:justify-end md:flex-row gap-4 h-full z-40 md:z-10 bg-white transition-all duration-1000',
          ]"
        >
          <li
            v-for="(item, i) in items.value"
            :key="item + i"
            @click="goTo(item.href.value)"
            :class="[
              'flex justify-center items-center md:h-full text-md md:text-xs',
              'text-lime-900  hover:text-green-500 active:text-lime-700 font-Kanit font-medium uppercase tracking-wider select-none flex-none',
              'cursor-pointer transition-all border-current md:hover:border-b',
              item.href.value.toLowerCase() == currentLayout
                ? 'text-green-500 active:text-green-500 md:border-b'
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
