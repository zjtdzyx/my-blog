import DefaultTheme from 'vitepress/theme'
import './custom.css'
import NavIcons from './components/NavIcons.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('NavIcons', NavIcons)
  },
  setup() {
    // 在这里注册全局组件
    return {
      layout: DefaultTheme.Layout,
      // 注入NavIcons组件
      NotFound: DefaultTheme.NotFound
    }
  }
} 