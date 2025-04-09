---
layout: home
title: ZYX的博客
hero:
  name: ZYX
  text: 前端开发工程师
  tagline: Midea实习生 | Atom组织领导者 | 全栈开发爱好者
  image:
    src: /avatar.png
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
    link: /posts/javascript/basics
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

<style>
:root {
  --content-width: 1200px;
}

.VPHomeHero .image {
  animation: float 6s ease-in-out infinite;
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
</style> 