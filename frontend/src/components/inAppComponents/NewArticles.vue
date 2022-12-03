<script>
import articleController from "@/controllers/article.controller.js";
import BasicContainer from "./Misc/BasicContainer.vue";
import ArticleCard from "@/components/inAppComponents/Misc/ArticleCard.vue";

export default {
  components: { BasicContainer, ArticleCard },
  name: "NewArticles",
  props: ["tag", "header"],
  data: () => ({
    loaded: false,
    newArticles: [],
  }),
  mounted: async function () {
    const queryObj = {
      skip: 0,
      limi: 3,
      isPublic: true,
      sortBy: "userDate",
      sortOrder: "descending",
    };

    if (!!this.tag.value && this.tag.value.length > 0) {
      queryObj.tags = this.tag.value;
    }

    this.newArticles = await this.getManyArticlesFromServer(queryObj);
    this.loaded = true;
  },
  mixins: [articleController],
};
</script>

<template>
  <basic-container class="p-2 font-Roboto mb-16" backgroundColor="#fafafa">
    <div
      v-if="loaded && newArticles.length > 0"
      class="grid grid-rows-[repeat(2,_auto);] grid-cols-1 gap-4 sm:md-8"
    >
      <article-card
        v-if="!!newArticles[0]"
        :name="newArticles[0].name"
        :date="newArticles[0].userDate"
        :href="newArticles[0].href"
        :mainImageId="newArticles[0].mainImageId"
      />

      <div class="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4">
        <template v-for="index in 2">
          <article-card
            v-if="!!newArticles[index]"
            :key="newArticles[index].name + ' ' + newArticles[index].userDate"
            :name="newArticles[index].name"
            :date="newArticles[index].userDate"
            :href="newArticles[index].href"
            :mainImageId="newArticles[index].mainImageId"
          />
        </template>
      </div>
    </div>
  </basic-container>
</template>
