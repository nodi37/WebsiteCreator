<script>
import ShapedList from "@/components/UI/Lists/ShapedList.vue";
import store from "@/store";
import layoutController from "@/controllers/layout.controller";
import ErrorOverlay from "@/components/ComplexComponents/ErrorOverlay.vue";
import LoginBoxOverlay from "@/components/ComplexComponents/LoginBoxOverlay.vue";
import settingController from "@/controllers/setting.controller";

//Refactoring needed
export default {
  name: "PanelView",
  data: () => ({
    drawer: true,
    layoutsLoaded: false,
    isError: false,
    items: [
      {
        text: "globalLayout",
        icon: "mdi-page-layout-body",
        path: { name: "globalTemplate" },
      },
      {
        text: "homeLayout",
        icon: "mdi-page-layout-header-footer",
        path: {
          name: "layoutManager",
          params: {
            layoutName: "homeLayout",
          },
        },
      },
      {
        text: "articles",
        icon: "mdi-file-document-edit-outline",
        path: { name: "articles" },
      },
      { text: "add-subpage", icon: "mdi-plus", path: { name: "addSubpage" } },
    ],
    settingsListItems: [
      { text: "settings", icon: "mdi-cog", path: { name: "settingsRoute" } },
    ],
  }),
  computed: {
    userLoggedIn: {
      get() {
        return store.state.userLoggedIn;
      },
      set(value) {
        store.dispatch("SET_LOGIN_STATUS", value);
      },
    },
    pageTitle() {
      return store.state.pageTitle;
    },
    toolbarTitle() {
      return store.state.toolbarTitle || "control-panel";
    },
    toolbarTitleTranslated() {
      const translated = this.$t(this.toolbarTitle);
      const capitalized =
        translated.charAt(0).toUpperCase() + translated.slice(1);
      return capitalized;
    },
    layoutsDocs() {
      return store.state.additionalLayouts.filter(
        (layout) => !layout.isRequired
      );
    },
    additionalItems() {
      return this.layoutsDocs.map((layout) => {
        return {
          text: layout.name.charAt(0).toUpperCase() + layout.name.slice(1),
          icon: "mdi-page-layout-header-footer",
          path: {
            name: "layoutManager",
            params: {
              layoutName: layout.name,
            },
          },
        };
      });
    },
  },
  components: {
    ShapedList,
    ErrorOverlay,
    LoginBoxOverlay,
  },
  mixins: [layoutController, settingController],
  mounted: async function () {
    try {
      const settings = await this.getBasicSettings();
      const subTitle = this.$t("control-panel");

      store.dispatch("SET_PAGE_LANG", settings.language);
      store.dispatch("SET_TITLE_SETTING", settings.title);
      store.dispatch("SET_PAGE_TITLE", subTitle);

      const allLayouts = await this.getManyLayouts();
      store.dispatch("REPLACE_ALL_LAYOUTS", allLayouts);
      this.layoutsLoaded = true;
    } catch (error) {
      console.log(error);
      this.isError = true;
    }
  },
};
</script>
<template>
  <v-app id="inspire" v-if="layoutsLoaded">
    <template v-if="userLoggedIn">
      <v-navigation-drawer v-model="drawer" app class="max-h-screen">
        <div class="w-full text-center">
          <p class="font-Roboto font-xs my-5">{{ pageTitle }}</p>
        </div>
        <v-divider />
        <shaped-list header="main-settings" :items="items" />
        <v-divider />
        <shaped-list header="user-layouts" :items="additionalItems" />
        <v-divider />
        <shaped-list class="mb-32" header="settings" :items="settingsListItems" />
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ toolbarTitleTranslated }}</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </template>
    <login-box-overlay v-else v-on:login="userLoggedIn = true" />
  </v-app>
</template>
