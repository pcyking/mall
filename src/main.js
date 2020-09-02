import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入 vant ui
import './pluginunit/vant.js'

// 图片懒加载
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad);

// less预处理
import less from 'less';
Vue.use(less);

//引入fastclick (移动端300毫秒延迟处理)
import FastClick from 'fastclick'

//添加事件总线
Vue.prototype.$bus = new Vue();
//解决移动端300毫秒延迟
FastClick.attach(document.body);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
