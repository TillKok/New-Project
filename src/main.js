import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 先找文件，没有就找目录
// 如果找到目录，优先加载目录中的 index
import router from './router'

// 引入公共样式文件，在element 样式文件后，可以自定义修改element 样式文件
import './styles/index.less'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
