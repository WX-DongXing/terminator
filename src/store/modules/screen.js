import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const ScreenMutations = {
  SET_SCREEN: 'SET_SCREEN[设置屏幕对象]',
  ACTIVE_WIDGET: 'ACTIVE_WIDGET[设置激活的窗口]',
};

export default {
  namespaced: true,
  state: {
    screen: null,
    activeWidget: null,
  },
  mutations: {
    [ScreenMutations.SET_SCREEN](state, payload) {
      state.screen = payload.screen;
    },
    [ScreenMutations.ACTIVE_WIDGET](state, payload) {
      state.activeWidget = payload.widget;
    },
  },
  actions: {
  },
  modules: {
  },
};
