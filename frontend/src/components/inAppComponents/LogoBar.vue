<script>
export default {
  name: "LogoBar",
  props: ["logoImg", "smallLogo", "text"],
};
</script>
<template>
  <div class="w-full shadow">
    <div class="mx-auto h-12 max-w-7xl flex items-center gap-x-1 px-4">
      <img v-if="smallLogo" :src="logoImg" class="h-8 w-8 md:h-10 md:w-10" />
      <img
        v-else
        :src="logoImg"
        class="h-32 w-32 md:h-40 md:w-40 z-20 mt-24 md:mt-32 ml-10"
      />
      <h1
        v-if="text"
        class="
          font-bold
          tracking-wide
          text-slate-500 text-xl
          md:text-2xl
          mb-1
          font-sans
          italic
        "
      >
        {{ text }}
      </h1>
    </div>
  </div>
</template>