<script>
import cookiesHelper from "@/helpers/cookiesHelper";

export default {
  name: "CookiesComp",
  data: () => ({
    visible: false,
  }),
  methods: {
    acceptHandler() {
        this.visible = false;
        this.setCookie('cookiesAccepted', true, 99999);
    }
  },
  mounted() {
    const cookie = this.getCookie("cookiesAccepted");
    if(!cookie) this.visible = true;
  },
  mixins: [cookiesHelper],
};
</script>

<template>
  <div
    v-if="visible"
    class="
      fixed
      bottom-0
      w-full
      px-4
      py-2
      flex
      justify-between
      items-center
      bg-slate-500
    "
  >
    <span class="text-sm text-white"
      >Strona wykorzystuje Cookies w celach statystycznych</span
    >
    <button
      type="button"
      class="
        text-[12px] text-slate-500
        font-Kanit font-medium
        tracking-wider
        uppercase
        px-4
        py-1
        bg-lime-400
        hover:bg-lime-500 hover:text-white
        active:bg-lime-600
        rounded
        transition-all
      "
      @click="acceptHandler"
    >
      akceptuję
    </button>
  </div>
</template>

