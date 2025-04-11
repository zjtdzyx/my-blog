---
layout: home
title: ZYX的博客 - 前端开发者的技术分享和项目展示
description: 专注于前端技术的个人博客，分享JavaScript、Vue、React、TypeScript等技术文章和项目经验
head:
  - - meta
    - name: keywords
      content: 前端开发,JavaScript,Vue,React,TypeScript,CSS,前端工程化,性能优化,美的实习,个人博客
  - - meta
    - name: author
      content: ZYX
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: ZYX的博客 - 前端开发者的技术分享空间
  - - meta
    - property: og:description
      content: 专注于前端技术的个人博客，分享JavaScript、Vue、React、TypeScript等技术文章和项目经验
  - - link
    - rel: canonical
      href: https://zjtdzyx.github.io/
hero:
  name: ZYX
  text: 前端开发工程师
  tagline: Midea实习生 | Atom组织领导者 | 全栈开发爱好者
  image:
    src: /avatar.svg
    alt: ZYX
  actions:
    - theme: brand
      text: 关于我
      link: /about/
    - theme: alt
      text: 技术博客
      link: /posts/javascript/basics
    - theme: alt
      text: 开源项目
      link: /projects/
features:
  - icon: 🚀
    title: 前端开发
    details: Vue、React、TailwindCSS、Bootstrap等主流前端技术栈
    link: /posts/javascript/basics
  - icon: 🧰
    title: 后端技术
    details: Node.js（Express/Fastify）、MongoDB、PostgreSQL等后端技术
    link: /posts/engineering/overview
  - icon: 💡
    title: Atom系列项目
    details: Atom-Video视频分享CMS、Atom-Stats数据可视化分析平台
    link: /projects/
  - icon: 🏢
    title: Midea实习
    details: 分享在美的集团的实习经历和技术成长
    link: /posts/midea/experience
  - icon: 📚
    title: 学习成长
    details: 记录从初级前端开发者成长为全栈开发者的历程
    link: /about/
  - icon: 🔮
    title: 开源贡献
    details: 积极参与开源社区，分享技术经验，提升影响力
    link: /projects/
---

<BlogHome />

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(
    135deg, 
    #42d392 10%, 
    #3c8cff 100%
  );
  --vp-home-hero-image-background-image: linear-gradient(
    -45deg, 
    #42d392 30%, 
    #3c8cff
  );
  --vp-home-hero-image-filter: blur(40px);
  --content-width: 100%;
  --layout-max-width: 1440px;
}

.VPHomeHero .image {
  animation: float 6s ease-in-out infinite;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.VPHomeHero .image-container {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 auto;
}

.VPHomeHero .image-container::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 80px 20px rgba(60, 140, 255, 0.3);
  z-index: -1;
  opacity: 0.8;
  filter: blur(20px);
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.VPHome {
  padding-bottom: 2rem;
}

/* 调整卡片布局，使其充分利用宽度 */
.VPFeatures {
  margin-bottom: 0 !important;
  padding: 0 2rem;
}

.VPFeatures .container {
  max-width: var(--layout-max-width);
  margin: 0 auto;
}

.VPFeatures .items {
  gap: 24px;
}

/* 调整特性卡片的最小宽度，使一行能显示更多卡片 */
@media (min-width: 768px) {
  .VPFeatures .item {
    width: calc((100% - 48px) / 3);
  }
}

@media (min-width: 1440px) {
  .VPFeatures .item {
    width: calc((100% - 72px) / 4);
  }
}

/* 主页内容区域宽度调整 */
.VPHome .VPHomeHero .container {
  max-width: var(--layout-max-width);
}

.blog-home {
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: 0 2rem;
}

/* 暗色模式优化 */
.dark .VPHomeHero .image-container::after {
  box-shadow: 0 0 100px 30px rgba(66, 211, 146, 0.25);
}
</style> 