<script>
import articleController from "@/controllers/article.controller";
import BasicContainer from "./Misc/BasicContainer.vue";
import ArticleCard from "./Misc/ArticleCard.vue";

export default {
  components: { BasicContainer, ArticleCard },
  name: "Galleries",
  props: ["header", "tag"],
  data: () => ({
    articlesArr: [],
    keyword: "",
    skip: 0,
    reqCount: 0,
    nothingMore: false,
  }),
  methods: {
    loadArticles: async function () {
      this.reqCount++;
      const currReq = this.reqCount;

      const articles = await this.getManyArticlesFromServer({
        isPublic: true,
        keyword: this.keyword,
        limit: 6,
        skip: this.skip,
        tag: this.tag,
      });

      if (currReq !== this.reqCount) return;
      if (articles.length < 6) this.nothingMore = true;
      this.skip = articles.length;
      this.articlesArr = articles;
    },
  },
  watch: {
    keyword() {
      this.articlesArr = [];
      this.nothingMore = false;
      this.loadArticles();
    },
  },
  mounted() {
    this.loadArticles();
  },
  mixins: [articleController],
};
</script>

<template>
  <basic-container class="my-16" backgroundColor="#fafafa">
    <div class="text-center">
      <h3
        v-if="header.value.length > 0"
        class="font-semibold text-2xl text-green-900 mb-4"
      >
        {{ header.value }}
      </h3>
      <input
        type="text"
        v-model="keyword"
        placeholder="Szukaj tutaj..."
        class="
          w-3/4
          text-base text-slate-600
          font-Kanit font-normal
          outline-none
          p-2
          bg-white
          rounded
          shadow
          focus:outline-green-500
        "
      />
      <div
        class="
          grid
          gap-4
          grid-cols-[repeat(auto-fit,_minmax(360px,_1fr))]
          p-4
          mb-16
        "
      >
        <article-card
          v-for="(article, i) in articlesArr"
          :key="'article-' + i"
          :name="article.name"
          :href="article.href"
          :mainImageId="article.mainImageId"
          :date="article.userDate"
        />
      </div>
      <button
        :class="[
          'w-3/4 p-4 bg-slate-200 text-green-600 rounded transition-all',
          'hover:bg-green-600 hover:text-white active:bg-green-900',
          nothingMore
            ? 'opacity-70 cursor-default hover:bg-slate-200 hover:text-green-600 active:bg-slate-200'
            : '',
        ]"
      >
        {{ nothingMore ? "Nie ma więcej wyników" : "Pokaż więcej" }}
      </button>
    </div>
  </basic-container>
</template>
