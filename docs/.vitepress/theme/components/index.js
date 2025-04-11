/**
 * 组件索引文件 - 将组件按功能分类
 * 此文件为过渡方案，后续会将组件文件物理移动到对应子目录
 */

// 布局组件
import BlogArticleLayout from './BlogArticleLayout.vue'

// 博客相关组件
import BlogHome from './BlogHome.vue'
import BlogDirectory from './BlogDirectory.vue'
import ArticleTOC from './ArticleTOC.vue'
import RelatedPosts from './RelatedPosts.vue'
import TagPosts from './TagPosts.vue'
import TagCloud from './TagCloud.vue'
import ArticleFooter from './ArticleFooter.vue'
import GiscusComments from './GiscusComments.vue'

// 导航组件
import CustomNav from './CustomNav.vue'
import NavBarIcon from './NavBarIcon.vue'
import NavIcons from './NavIcons.vue'

// UI组件
import ProjectCard from './ProjectCard.vue'
import SponsorButton from './SponsorButton.vue'
import ScrollFeatures from './ScrollFeatures.vue'
import FloatingElements from './FloatingElements.vue'
import ThemeSwitcher from './ui/ThemeSwitcher.vue'

// 通用组件
import LazyImage from './LazyImage.vue'

// 按类别导出组件
export const layoutComponents = {
  BlogArticleLayout
}

export const blogComponents = {
  BlogHome,
  BlogDirectory,
  ArticleTOC,
  RelatedPosts,
  TagPosts,
  TagCloud,
  ArticleFooter,
  GiscusComments
}

export const navigationComponents = {
  CustomNav,
  NavBarIcon,
  NavIcons
}

export const uiComponents = {
  ProjectCard,
  SponsorButton,
  ScrollFeatures,
  FloatingElements,
  ThemeSwitcher
}

export const commonComponents = {
  LazyImage
}

// 导出所有组件
export default {
  ...layoutComponents,
  ...blogComponents,
  ...navigationComponents,
  ...uiComponents,
  ...commonComponents
} 