import Vue from 'vue'
import App from './App.vue'
// 导入element-ui相关
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
