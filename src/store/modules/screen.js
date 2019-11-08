import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const ScreenMutations = {
  SET_VIEW: 'SET_VIEW[设置视图对象]',
  ACTIVE_WIDGET: 'ACTIVE_WIDGET[设置激活的窗口]',
};

export default {
  namespaced: true,
  state: {
    // 视图对象
    view: null,
    // 激活的部件
    activeWidget: null,
  },
  mutations: {
    [ScreenMutations.SET_VIEW](state, payload) {
      state.view = payload.view;
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
