import componentsModels from '@/models/componentsModels';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageName: 'Koło 22 Energetyk Radom',
    userLoggedIn: false,
    toolbarTitle: null,
    additionalLayouts: [],
    componentsModels: componentsModels
  },
  mutations: {
    setLoginStatus(state, data) {
      state.userLoggedIn = data;
    },
    setToolbarTitle(state, data) {
      state.toolbarTitle = data;
    },
    pushNewLayout(state, data) {
      state.additionalLayouts.push(data);
    },
    replaceLayouts(state, data) {
      state.additionalLayouts = data;
    },
  },
  actions: {
    SET_LOGIN_STATUS({ commit }, data) {
      commit('setLoginStatus', data);
    },
    SET_NEW_TOOLBAR_TITLE({ commit }, data) {
      commit('setToolbarTitle', data);
    },
    PUSH_NEW_LAYOUT({ commit }, data) {
      commit('pushNewLayout', data);
    },
    REPLACE_ALL_LAYOUTS({ commit }, data) {
      commit('replaceLayouts', data);
    },
  },

  getters: {
  },


  modules: {
  }
})
