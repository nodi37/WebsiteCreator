<script>
import BasicContainer from "./Misc/BasicContainer.vue";
import ImageLoader from "./Misc/ImageLoader.vue";
export default {
  components: { BasicContainer, ImageLoader },
  name: "Statement",
  props: ["image", "header", "content", "items", "bold", "textCenter"],
};
</script>
<template>
  <basic-container class="md:p-2 font-Roboto" backgroundColor="#fafafa">
    <div class="m-3 p-4 bg-white rounded-md shadow">
      <h3 class="text-center font-semibold text-2xl text-green-900 mb-4">
        {{ header.value }}
      </h3>

      <div class="grid gap-4 grid-cols-statementsm sm:grid-cols-statementmd">
        <div
          v-if="content.value.length > 1 || !!items.value.length > 1"
          :class="[
            bold.value ? 'font-medium' : '',
            textCenter.value ? 'text-center' : '',
          ]"
        >
          <p v-if="content.value" class="mb-8">
            {{ content.value }}
          </p>

          <ul>
            <li
              v-for="(item, i) in items.value"
              :key="item.type + '-' + i"
              class="mb-1"
            >
              {{ item.item.value }}
            </li>
          </ul>
        </div>

        <image-loader
          class="rounded shadow"
          v-if="image.value"
          :imageId="image.value"
        />
      </div>
    </div>
  </basic-container>
</template>
