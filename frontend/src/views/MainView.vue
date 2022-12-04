<script>
import compsImporter from "@/helpers/inAppCompsImporter";
import cookiesHelper from "@/helpers/cookiesHelper";
import LayoutView from "@/views/LayoutView.vue";
import settingController from "@/controllers/setting.controller";
import statsService from "@/services/stats.service";
import store from "@/store";

export default {
  name: "Main",
  data: () => ({
    topComponents: [],
    bottomComponents: [],
    userLayout: "",
    isLoaded: false,
  }),
  methods: {
    setUserLayout() {
      const uLayout = this.$route.params.layoutName;

      if (this.$route.path === "/") {
        this.userLayout = "homeLayout";
        const subTitle = this.$t("main-page");
        store.dispatch("SET_PAGE_TITLE", subTitle);
      }

      if (!!uLayout) {
        this.userLayout = uLayout;
        store.dispatch(
          "SET_PAGE_TITLE",
          uLayout.charAt(0).toUpperCase() + uLayout.slice(1)
        );
      }

      this.isLoaded = true;
    },
  },
  watch: {
    "$route.params.layoutName": function () {
      this.setUserLayout();
    },
  },
  mounted: async function () {
    const settings = await this.getBasicSettings();

    store.dispatch("SET_PAGE_LANG", settings.language);
    store.dispatch("SET_TITLE_SETTING", settings.title);
    
    this.setUserLayout();

    if(!this.getCookie('alreadyVisited')) {
      this.setCookie('alreadyVisited', true, 999999);
      this.incStatRequest('visitsCount');
    } 
  },
  computed: {
    topByOrder() {
      return this.topComponents.sort((a, b) => a.order - b.order);
    },
    bottomByOrder() {
      return this.bottomComponents.sort((a, b) => a.order - b.order);
    },
  },
  components: { LayoutView },
  mixins: [compsImporter, settingController, cookiesHelper, statsService],
};
</script>
<template>
  <div class="w-screen overflow-hidden bg-[#fafafa]">
    <!-- need to add some loader and refactor -->
    <layout-view v-if="isLoaded" :isGlobal="true" layoutName="topLayout" />
    <layout-view v-if="isLoaded" :isGlobal="false" :layoutName="userLayout" />
    <layout-view v-if="isLoaded" :isGlobal="true" layoutName="bottomLayout" />
  </div>
</template>
