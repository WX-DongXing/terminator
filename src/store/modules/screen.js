import Vue from 'vue'
import Vuex from 'vuex'
import anime from 'animejs'

Vue.use(Vuex)

export const ScreenMutations = {
  SET_VIEW: 'SET_VIEW[设置视图对象]',
  ADD_WIDGET: 'ADD_WIDGET[添加部件]',
  REMOVE_WIDGET: 'REMOVE_WIDGET[添加部件]',
  ACTIVATION_WIDGET: 'ACTIVATION_WIDGET[设置激活的窗口]'
}

export default {
  namespaced: true,
  state: {
    // 视图对象
    view: null,
    // 视图中所有部件对象
    widgets: [],
    // 激活的部件对象，作为可读属性使用，不可通过非mutation方式进行修改
    activeWidget: null
  },
  mutations: {
    // 设置视图对象
    [ScreenMutations.SET_VIEW] (state, payload) {
      state.view = payload.view
    },
    // 向视图部件库中添加部件
    [ScreenMutations.ADD_WIDGET] (state, payload) {
      state.widgets.push(payload.widget)
    },
    // 从视图部件库中移除该部件
    [ScreenMutations.REMOVE_WIDGET] (state, payload) {
      state.widgets = state.widgets.filter(widget => widget.widgetId !== payload.widgetId)
      // 置空激活部件
      state.activeWidget = null
      // 隐藏选择器
      anime.set(document.getElementById('wrapper'), {
        display: 'none'
      })
    },
    // 设置激活的部件，并修改widgets中的部件，深度复制激活部件，保留render对象
    [ScreenMutations.ACTIVATION_WIDGET] (state, payload) {
      state.activeWidget = payload.widget
      // 如果选择的是部件，则更新部件的配置
      if (payload.widget && payload.widget.widgetId) {
        const activeWidget = state.widgets.find(
          widget => widget.widgetId === payload.widget.widgetId
        )
        Object.assign(activeWidget, payload.widget)
      }
    }
  },
  actions: {
  },
  modules: {
  }
}
