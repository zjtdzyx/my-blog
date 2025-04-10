import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import BlogHome from './components/BlogHome.vue'
import BlogDirectory from './components/BlogDirectory.vue'
import FloatingElements from './components/FloatingElements.vue'
import ProjectCard from './components/ProjectCard.vue'
import SponsorButton from './components/SponsorButton.vue'
import ArticleFooter from './components/ArticleFooter.vue'
import ScrollFeatures from './components/ScrollFeatures.vue'
import TagCloud from './components/TagCloud.vue'
import TagPosts from './components/TagPosts.vue'
import Layout from './Layout.vue'
import RelatedPosts from './components/RelatedPosts.vue'
import ArticleTOC from './components/ArticleTOC.vue'
import BlogArticleLayout from './components/BlogArticleLayout.vue'
import GiscusComments from './components/GiscusComments.vue'

// Element Plus 组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { LazyLoadPlugin } from './plugins/lazyload'

// 自定义布局组件配置
const layoutComponents = {
  'blog-article': BlogArticleLayout,
  // 其他自定义布局...
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.use(ElementPlus)
    
    // 应用懒加载插件
    app.use(LazyLoadPlugin)
    
    // 注册全局组件
    app.component('BlogHome', BlogHome)
    app.component('BlogDirectory', BlogDirectory)
    app.component('FloatingElements', FloatingElements)
    app.component('ProjectCard', ProjectCard)
    app.component('SponsorButton', SponsorButton)
    app.component('ArticleFooter', ArticleFooter)
    app.component('ScrollFeatures', ScrollFeatures)
    app.component('TagCloud', TagCloud)
    app.component('TagPosts', TagPosts)
    app.component('RelatedPosts', RelatedPosts)
    app.component('ArticleTOC', ArticleTOC)
    app.component('BlogArticleLayout', BlogArticleLayout)
    app.component('GiscusComments', GiscusComments)
    
    // 为自定义布局注册组件
    Object.entries(layoutComponents).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
} 