import DefaultTheme from 'vitepress/theme'
import './styles/base.css'
import './styles/custom.css'
import './styles/critical.css'
import './styles/variables.css'
import { i18n } from '../i18n'
import LanguageSwitch from './components/LanguageSwitch.vue'

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
    app.use(i18n)
    
    // 注册所有插件
    registerPlugins(app)
    
    // 注册所有组件
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
    
    // 不再单独注册各个类别组件，避免重复注册问题
    app.component('LanguageSwitch', LanguageSwitch)
  }
} 