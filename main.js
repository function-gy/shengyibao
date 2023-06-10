import App from './App'
// #ifndef VUE3
import Vue from 'vue'

// vuex
import store from '@/store'
import tool from '@/util/tool/index.js'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
import api from '@/api/index'
import configURl from '@/util/configURl.js' //图片域名
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$tool = tool
Vue.prototype.$baseUrl = configURl.baseUrl;
Vue.prototype.$appid = configURl.appid;

App.mpType = 'app'

import smjloading from '@/components/smj-loading/index.vue';
Vue.component('smjloading',smjloading)


// 引入uView对小程序分享的mixin封装
let mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);
Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'
// console.log = () => {}//清空页面中的所有console
// 引入请求封装，将app参数传递到配置中
const app = new Vue({
	...App
})
require('./request/http.js')(app)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif