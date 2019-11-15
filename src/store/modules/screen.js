import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const ScreenMutations = {
  SET_VIEW: 'SET_VIEW[设置视图对象]',
  ADD_WIDGET: 'ADD_WIDGET[添加部件]',
  REMOVE_WIDGET: 'REMOVE_WIDGET[添加部件]',
  ACTIVATION_WIDGET: 'ACTIVATION_WIDGET[设置激活的窗口]',
};

export default {
  namespaced: true,
  state: {
    // 视图对象
    view: null,
    // 视图中所有部件对象
    widgets: [],
    // 激活的部件
    activeWidget: null,
  },
  mutations: {
    // 设置视图对象
    [ScreenMutations.SET_VIEW](state, payload) {
      state.view = payload.view;
    },
    // 向视图部件库中添加部件
    [ScreenMutations.ADD_WIDGET](state, payload) {
      state.widgets.push(payload.widget);
    },
    // 从视图部件库中移除该部件
    [ScreenMutations.REMOVE_WIDGET](state, payload) {
      state.widgets = state.widgets.filter(widget => widget.id !== payload.widgetId);
    },
    // 设置激活的部件
    [ScreenMutations.ACTIVATION_WIDGET](state, payload) {
      state.activeWidget = payload.widget;
    },
  },
  actions: {
  },
  modules: {
  },
};
