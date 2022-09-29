<script>
export default {
  name: "FullWidthImage",
  props: ["image", "primaryText", "secondaryText"],
};
</script>
<template>
    <div class="relative w-full h-80 md:h-128 overflow-hidden shadow-2xl">
        <div class="absolute h-full w-full z-10 flex flex-col justify-center items-center text-center bg-gradient-to-r from-[#8080807e] to-[#808080d0]">
            <h1 v-if="primaryText" class="text-white text-3xl font-semibold mb-3">{{primaryText}}</h1>
            <span v-if="secondaryText" class="text-white text-lg font-medium">{{secondaryText}}</span>
        </div>

        <img :src="image" class="absolute w-full h-full object-cover object-center">
    </div>
</template>