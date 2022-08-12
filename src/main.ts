import { createApp } from 'vue'
import App from './App.vue'
//导入路由
import router from './router/index'
//导入动画库
import 'animate.css'
// 导入全局样式
import './assets/css/global.scss'
import 'element-plus/dist/index.css'

createApp(App).use(router).mount('#app')
