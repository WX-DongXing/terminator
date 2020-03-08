/**
* vuex 引入
* Author: dong xing
* Date: 2020/3/8
* Time: 17:39
* Email: dong.xing@outlook.com
*/

import Vue from 'vue'
import Vuex from 'vuex'
import screen from './modules/screen'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    screen
  }
})
