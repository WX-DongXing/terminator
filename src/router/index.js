import Vue from 'vue'
import VueRouter from 'vue-router'
import Design from '../views/design'
import Preview from '../views/preview'
import Exception404 from '../views/exception/404'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '', redirect: './design' },
    { path: '/design', component: Design },
    { path: '/preview', component: Preview },
    { path: '*', component: Exception404 }
  ]
})

export default router
