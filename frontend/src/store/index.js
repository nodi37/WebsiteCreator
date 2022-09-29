import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageName: 'Koło 22 Energetyk Radom',
    toolbarTitle: null,
    componentsModels: [
      {
        name: 'LogoBar',
        description: 'Just white bar with logo',
        props: {
          texts: [{ name: 'text' }],
          images: [{ name: 'logoImg', maxSize: 512, format: 'png' }], //Width - minimal width 512px is recommended
          booleans: [{ name: 'smallLogo' }, { name: 'withText' }],
        }
      },
      {
        name: 'FullWidthImage',
        description: '100% of window width image',
        props: {
          texts: [{ name: 'primaryText' }, { name: 'secondaryText' }],
          images: [
            { name: 'image', maxSize: 3840, format: 'jpeg' },
          ], //3840 for max 4K monitors, use false to return original image
        }
      },
    ],
  },
  mutations: {
    setToolbarTitle(state, data) {
      state.toolbarTitle = data;
    }
  },
  actions: {
    SET_NEW_TOOLBAR_TITLE({ commit }, data) {
      commit('setToolbarTitle', data);
    }
  },

  getters: {
  },


  modules: {
  }
})
