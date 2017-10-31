import Vue from 'vue'
import Router from 'vue-router'
import Main from 'com/main/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main/Main'
    },
    {
      path: '/main/Main',
      name: 'Main',
      component: Main,
      meta: {requireAuth: true}
    }
  ]
})
