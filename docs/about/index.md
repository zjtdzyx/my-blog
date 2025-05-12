# 关于我

## 个人简介

大家好，我是zyx，目前在Midea进行前端开发的实习。最近在忙着开发Atom Video和Atom Nexus两项产品，并期待未来商用！

本人想成为一名顶尖的软件开发工程师！正在努力学习中......

<script setup>
import { ref } from 'vue'
import WebsiteBuildCard from '../.vitepress/theme/components/ui/WebsiteBuildCard.vue'
import SiteStats from '../.vitepress/theme/components/ui/SiteStats.vue'

// 网站建设数据
const websiteBuilds = ref([
  {
    title: 'Vue.js',
    description: '渐进式JavaScript框架，易学易用，性能出色，适用场景丰富的Web前端框架。',
    icon: 'https://vuejs.org/images/logo.png',
    link: 'https://vuejs.org',
    color: '#42b883'
  },
  {
    title: 'VitePress',
    description: '基于Vite的静态站点生成器，专为构建快速、内容为中心的网站而设计。',
    icon: 'https://vitepress.dev/vitepress-logo-mini.svg',
    link: 'https://vitepress.dev',
    color: '#646cff'
  },
  {
    title: 'TypeScript',
    description: 'JavaScript的超集，添加了静态类型定义，提高代码质量和可维护性。',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    link: 'https://www.typescriptlang.org',
    color: '#3178c6'
  },
  {
    title: 'Tailwind CSS',
    description: '功能类优先的CSS框架，用于快速构建定制用户界面。',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    link: 'https://tailwindcss.com',
    color: '#38bdf8'
  }
])

// 网站统计数据
const statsData = {
  creationDate: '2025-04-10', // 网站创建日期
  lastDeployDate: '2025-04-19' // 最后部署日期
}
</script>

## 本站技术栈

<div class="website-build-section">
  <p class="section-description">本站使用了以下主流技术和框架进行构建，打造高性能、美观的现代化博客。</p>
  
  <div class="website-build-grid">
    <WebsiteBuildCard
      v-for="build in websiteBuilds"
      :key="build.title"
      v-bind="build"
    />
  </div>
</div>

## 网站数据统计

<SiteStats
  :creation-date="statsData.creationDate"
  :last-deploy-date="statsData.lastDeployDate"
/>

<style>
.website-build-section {
  margin: 2rem 0 3rem;
  position: relative;
}

.section-description {
  text-align: center;
  color: var(--vp-c-text-2);
  max-width: 700px;
  margin: 0 auto 2rem;
  font-size: 1.05rem;
  line-height: 1.6;
}

.website-build-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .website-build-grid {
    grid-template-columns: 1fr;
  }
}
</style>

## 技术栈

### 前端技术
- Vue.js（Vue2/Vue3）及其生态（Vuex、Vue Router等）
- React.js及其生态（Redux、React Router等）
- CSS框架：TailwindCSS、Bootstrap、UnoCss
- 构建工具：Vite、Webpack
- 静态站点生成：VitePress、Next.js

### 后端技术
- Node.js（Express.js/Fastify框架）
- Python（FastAPI框架）
- 数据库：PostgreSQL、MongoDB
- API设计与开发

### 开发工具
- 编辑器：VSCode
- 版本控制：Git、GitHub CLI
- 包管理：npm、yarn、bun
- CI/CD：GitHub Actions、Jenkins


## 项目经历

### Atom系列开源项目
自己弄着玩，想开发一套Atom系列的可商用产品：

#### [Atom-Video](https://github.com/FightingTrip/atom-video)
这是一个面向开发者的视频分享平台，提供以下功能：

XXX正在开发中，敬请期待.......

**技术栈**：Vue 3、TypeScript、Tailwind CSS、Naive UI、NestJS、PostgreSQL

#### [Atom-Nexus](https://github.com/zjtdzyx/atom-nexus)
去中心化数字身份验证平台：

XXX正在开发中，敬请期待.......

**技术栈**：Vue 3、TypeScript、UnoCSS、Naive UI、NestJS、PostgreSQL

> 欢迎访问[项目页面](/projects/)了解更多详情或参与贡献！



## 工作经历

目前在Midea进行前端开发的实习，主要参与的是广汽研究所的多端企业级后台管理系统项目，锻炼自己的业务编码能力。

主要工作内容包括：
- PC端、企业微信端、移动APP端多模块的开发与维护
- 开发新需求、解决bug、拉通模块功能
- 重构旧业务逻辑代码、封装与使用全局组件、编写机型适配
- 联系顾问、后端开会讨论、解决复杂业务问题

## 开源贡献

- GitHub: [@zjtdzyx](https://github.com/zjtdzyx)
- 邮箱: [yuxiangzhang040727@gmail.com](mailto:yuxiangzhang040727@gmail.com)
- 开源项目: [Atom系列项目](/projects/)

## 学习方式

我通过以下方式不断提升自己的技能：
- 参与实际项目开发，在实践中学习
- 阅读技术文档和教程
- 关注行业动态和前沿技术
- 开源贡献，参与社区交流

## 关注领域

- 内容管理系统（CMS）设计与开发
- Web性能优化
- 跨端开发技术
- 前端工程化实践
- 开发者工具与体验提升

## 联系我

如果你对我的项目或者文章有任何问题，或者有合作的想法，欢迎通过以下方式联系我：

- GitHub: [@zjtdzyx](https://github.com/zjtdzyx)
- 邮箱: [yuxiangzhang040727@gmail.com](mailto:yuxiangzhang040727@gmail.com)

## 🎨 个性化设置

<ThemeSwitcher />

---

<div class="sponsor-section">
  <h2>支持我的工作</h2>
  <p>如果您觉得我的博客内容对您有帮助，或者欣赏我的开源项目，可以考虑支持我继续创作和开发。您的每一份支持都是我持续前进的动力！</p>
  
  <div class="sponsor-buttons">
    <SponsorButton
      buttonText="请我喝杯咖啡 ☕"
      title="请我喝杯咖啡"
      message="感谢您的支持！您的赞助将帮助我创作更多优质内容和开源项目。"
    />
    <a href="https://github.com/sponsors/zjtdzyx" target="_blank" class="github-sponsor">
      <svg viewBox="0 0 24 24" height="16" width="16" aria-hidden="true" focusable="false" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M12.75 4.75a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0v-2zm0 12.5a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0v-2zm-9-4.5h-2a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5zm16.5 0h-2a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5zm-2.12-5.03-1.25-1.25a.75.75 0 0 0-1.06 1.06l1.25 1.25a.75.75 0 0 0 1.06-1.06zM5.97 17.03l-1.25-1.25a.75.75 0 0 0-1.06 1.06l1.25 1.25a.75.75 0 0 0 1.06-1.06zm-1.06-9.28a.75.75 0 0 0 0 1.06l1.25 1.25a.75.75 0 0 0 1.06-1.06L6.03 7.75a.75.75 0 0 0-1.06 0zm12.12 10.34 1.25 1.25a.75.75 0 0 0 1.06-1.06l-1.25-1.25a.75.75 0 0 0-1.06 1.06zM12 5.25a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5zM3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0z"></path>
      </svg>
      <span>在GitHub上赞助</span>
    </a>
  </div>
</div>

<style>
.sponsor-section {
  margin-top: 3rem;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  text-align: center;
}

.sponsor-section h2 {
  margin-top: 0;
  font-size: 1.5rem;
}

.sponsor-section p {
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.sponsor-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.github-sponsor {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  background-color: #2ea44f;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(46, 164, 79, 0.3);
}

.github-sponsor:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(46, 164, 79, 0.4);
  text-decoration: none;
}

@media (max-width: 640px) {
  .sponsor-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>

感谢您访问我的博客！ 