// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moment from 'moment'
import App from './App'
import router from './router'
import store from './store'
import 'as/css/index.scss'
import 'as/js/rsqAdapterManager.js'
// import 'as/js/rsqWebAdapter.js'
import 'as/js/rsqDdpAdapter.js'
// xss漏洞
import 'as/js/xssFilter.js'

// 全局添加Promise垫片，防止不支持promise的浏览器中出现bug
import Pro from 'es6-promise'
import Sortable from 'vue-sortable'
import draggable from 'vuedraggable'
Vue.component('draggable', draggable)
Vue.use(Sortable)
Pro.polyfill()
Vue.use(moment)
Vue.use(draggable)
Vue.config.productionTip = false
window.rsqadmg.exec('auth', {
  success: function (rsqUser, authUser) {
    store.state.loginUser = {
      rsqUser: rsqUser,
      authUser: authUser
    }
    // console.log(JSON.stringify(rsqUser))
    // growingUtil.growingIoMethod(rsqUser)
    //  去掉iOS的回弹效果
    window.rsqadmg.exec('disableBounce')

    store.state.env.isAddNav = true

    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
  },
  error: function () {
    alert('验证失败')
  }
})
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
// })
