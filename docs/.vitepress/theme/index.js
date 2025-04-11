import DefaultTheme from 'vitepress/theme'
import './styles/base.css'
import './styles/custom.css'
import './styles/critical.css'
import './styles/variables.css'

// 导入所有组件
import components, { 
  layoutComponents, 
  blogComponents, 
  navigationComponents, 
  uiComponents, 
  commonComponents 
} from './components'

// 布局组件
import Layout from './Layout.vue'
import FloatingElements from './components/ui/FloatingElements.vue'

// Element Plus 组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// 导入插件
import { registerPlugins } from './plugins'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.use(ElementPlus)
    
    // 注册所有插件
    registerPlugins(app)
    
    // 注册所有组件
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
    
    // 为自定义布局注册组件
    Object.entries(layoutComponents).forEach(([name, component]) => {
      app.component(name, component)
    })
    
    // 注册浮动元素组件
    app.component('FloatingElements', FloatingElements)
  }
} 