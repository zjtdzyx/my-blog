---
layout: home
title: ZYX的博客 - 不止开发技术的分享，更有生活与远方
description: 专注于前端技术的个人博客，分享JavaScript、Vue、React、TypeScript等技术文章和项目经验
head:
  - - meta
    - name: keywords
      content: 前端开发,JavaScript,Vue,React,TypeScript,CSS,前端工程化,性能优化,实习经历,个人博客
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
  tagline: 计算机世界爱好者 | 喜欢动漫 | 希望完成Atom系列作品
  image:
    src: /images/site/avatar.png
    alt: ZYX
  actions:
    - theme: brand
      text: 关于我
      link: /about/
    - theme: alt
      text: 博客
      link: /posts/javascript/basics
    - theme: alt
      text: 开源项目
      link: /projects/
features:
  - icon: 🚀
    title: 前端基础知识
    details: Vue、React、TailwindCSS、Bootstrap等主流前端技术栈
    link: /posts/base/
  - icon: 🧰
    title: 正在探索的事情
    details: 通过n8n将AI融入应用程序、研究低代码平台......
    link: /posts/studying/
  - icon: 💡
    title: Atom系列项目
    details: Atom-Video视频分享CMS、Atom-Stats数据可视化分析平台
    link: /projects/
  - icon: 🏢
    title: 工作经历
    details: 分享实习与工作的经历
    link: /posts/experience
  - icon: 📚
    title: 关于我
    details: 记录从初级前端开发者成长为全栈开发者的历程
    link: /about/
  - icon: 🔮
    title: 项目经历
    details: 正在开发的项目与开源的参与
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