import componentsModels from "@/models/componentsModels";
import Vue from "vue";
import Vuex from "vuex";
import i18n from '../i18n'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageTitle: "My website",
    pageLanguage: "en",
    userLoggedIn: false,
    toolbarTitle: null,
    additionalLayouts: [],
    componentsModels: componentsModels,
    loadedImages: [],
    languages: [
      {
        text: "Polski",
        value: "pl",
      },
      {
        text: "English",
        value: "en",
      },
    ],
  },
  mutations: {
    setPageTitle(state, data) {
      state.pageTitle = data;
    },
    setPageLang(state, data) {
      state.pageLanguage = data;
    },
    setTitleSetting(state, data) {
      state.titleSetting = data;
    },
    setLoginStatus(state, data) {
      state.userLoggedIn = data;
    },
    setToolbarTitle(state, data) {
      state.toolbarTitle = data;
    },
    pushNewLayout(state, data) {
      state.additionalLayouts.push(data);
    },
    pushNewImage(state, data) {
      state.loadedImages.push(data);
    },
    replaceLayouts(state, data) {
      state.additionalLayouts = data;
    },
  },
  actions: {
    SET_PAGE_LANG({ commit }, data) {
      i18n.locale = data;
      commit("setPageLang", data);
    },
    SET_TITLE_SETTING({ commit }, data) {
      commit("setPageTitle", data);
    },
    SET_PAGE_TITLE({}, data) {
      document.title = this.state.pageTitle + " - " + data;
    },
    SET_LOGIN_STATUS({ commit }, data) {
      commit("setLoginStatus", data);
    },
    SET_NEW_TOOLBAR_TITLE({ commit }, data) {
      commit("setToolbarTitle", data);
    },
    PUSH_NEW_LAYOUT({ commit }, data) {
      commit("pushNewLayout", data);
    },
    PUSH_NEW_IMAGE({ commit }, data) {
      commit("pushNewImage", data);
    },
    REPLACE_ALL_LAYOUTS({ commit }, data) {
      commit("replaceLayouts", data);
    },
  },

  getters: {},

  modules: {},
});
