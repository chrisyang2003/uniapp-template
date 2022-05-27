import App from './App'
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'



Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store'

const app = new Vue({
	store,
    ...App
})



// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/mixin.js')
Vue.mixin(vuexStore)


import {tools} from '@/common/mixin.js'
Vue.mixin(tools)


// 定义api对象
Vue.prototype.$api = {}; 
// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)


// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
// 原因是在Vue挂载this实例(也即初始化App.vue)之前配置请求信息，所以在App.vue中也能正常发出请求
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()
