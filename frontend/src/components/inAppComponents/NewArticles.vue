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
  <basic-container class="p-2 mb-16" backgroundColor="#fafafa">
    <div
      v-if="loaded && newArticles.length > 0"
      class="grid grid-cols-1 grid-rows-[repeat(2,_auto)] lg:grid-cols-2 gap-4"
    >
        <template v-for="index in 2">
          <article-card
            v-if="!!newArticles[index-1]"
            :key="newArticles[index-1].name + ' ' + newArticles[index-1].userDate"
            :name="newArticles[index-1].name"
            :date="newArticles[index-1].userDate"
            :href="newArticles[index-1].href"
            :mainImageId="newArticles[index-1].mainImageId"
          />
        </template>

      <div class="col-span-full grid grid-rows-[repeat(3,_auto)] lg:grid-rows-1 lg:grid-cols-3 gap-4">
        <template v-for="index in 2">
          <article-card
            v-if="!!newArticles[index+1]"
            :key="newArticles[index+1].name + ' ' + newArticles[index+1].userDate"
            :name="newArticles[index+1].name"
            :date="newArticles[index+1].userDate"
            :href="newArticles[index+1].href"
            :mainImageId="newArticles[index+1].mainImageId"
          />
        </template>
      </div>


    </div>
  </basic-container>
</template>
