import DefaultTheme from 'vitepress/theme'
import './custom.css'
import './style.css'
import BlogHome from './components/BlogHome.vue'
import BlogDirectory from './components/BlogDirectory.vue'
import FloatingElements from './FloatingElements.vue'
import ProjectCard from './components/ProjectCard.vue'
import Layout from './Layout.vue'

// Element Plus 组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('BlogHome', BlogHome)
    app.component('BlogDirectory', BlogDirectory)
    app.component('FloatingElements', FloatingElements)
    app.component('ProjectCard', ProjectCard)
    
    // 使用Element Plus
    app.use(ElementPlus)
  }
} 