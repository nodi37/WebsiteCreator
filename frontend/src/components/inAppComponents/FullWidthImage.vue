<script>
import ImageLoader from './Misc/ImageLoader.vue';
export default {
  name: "FullWidthImage",
  props: ["image", "primaryText", "secondaryText"],
  components: { ImageLoader },
};
</script>
<template>
    <div class="relative w-full h-[550px] md:h-128 overflow-hidden shadow font-Rajdhani mb-10">
        <div class="absolute h-full w-full z-10 flex flex-col justify-center items-center text-center bg-gradient-to-r from-[#8080807e] to-[#808080d0]">
            <h1 v-if="primaryText.value" class="text-white text-2xl md:text-3xl font-semibold mb-3 select-none">{{primaryText.value}}</h1>
            <h2 v-if="secondaryText.value" class="text-white text-lg md:text-xl font-medium select-none">{{secondaryText.value}}</h2>
        </div>
        <image-loader :imageId="image.value" class="absolute w-full h-full object-cover object-center" />
    </div>
</template>