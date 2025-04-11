---
title: 开源项目
description: 我参与和开发的开源项目展示
---

# 开源项目

<div class="projects-header">
  <div class="header-content">
    <h2>我的开源贡献</h2>
    <p>这里展示了我最近参与和开发的一些开源项目，涵盖了前端开发的各个领域。</p>
  </div>
</div>

<div class="projects-grid">
  <ProjectCard
    title="Atom-Video"
    description="一个基于Vue 3和Node.js的视频分享平台，支持视频上传、分类、播放和评论功能。使用Element Plus作为UI框架，MongoDB作为数据库。"
    imageUrl="/projects/atom-video.svg"
    :tags="['Vue 3', 'Node.js', 'MongoDB', 'Element Plus']"
    demoUrl="https://github.com/zjtdzyx"
    repoUrl="https://github.com/zjtdzyx/atom-video"
    :progress="85"
  />
  
  <ProjectCard
    title="Atom-Stats"
    description="数据可视化分析平台，使用React、Echarts和TailwindCSS搭建。支持多种数据源导入，可视化图表生成和数据分析功能。"
    imageUrl="/projects/atom-stats.svg"
    :tags="['React', 'Echarts', 'TailwindCSS', 'TypeScript']"
    demoUrl="https://github.com/zjtdzyx"
    repoUrl="https://github.com/zjtdzyx/atom-stats"
    :progress="65"
  />
  
</div>

<div class="more-projects">
  <h2>更多项目</h2>
  <p>我还参与了以下开源项目的贡献：</p>
  
  <div class="project-list">
    <div class="project-item">
      <div class="project-icon">🔍</div>
      <div class="project-info">
        <h3>Search-UI</h3>
        <p>轻量级搜索UI组件，支持多种搜索模式和自定义样式。</p>
        <div class="project-links">
          <a href="https://github.com/zjtdzyx" target="_blank">查看源码</a>
        </div>
      </div>
    </div>
    
  </div>
</div>

<style scoped>
.projects-header {
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand-dark));
  color: white;
  max-width: 100%;
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
  max-width: 100%;
}

.projects-grid > * {
  flex: 1 1 350px;
  min-width: 0;
  max-width: 100%;
}

.more-projects {
  padding: 2rem;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  margin-bottom: 2rem;
  max-width: 100%;
}

.more-projects h2 {
  margin-top: 0;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.project-item {
  flex: 1 1 280px;
  display: flex;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  transition: all 0.3s ease;
}

.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.project-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.project-info h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.project-info p {
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
}

.project-links a {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
  text-decoration: none;
  transition: all 0.2s ease;
}

.project-links a:hover {
  background-color: var(--vp-c-brand-dimm-dark);
}

/* 在大屏幕上使用更多列 */
@media (min-width: 1440px) {
  .projects-grid > * {
    flex-basis: calc(25% - 1.5rem);
  }
  
  .project-list > * {
    flex-basis: calc(25% - 1.125rem);
  }
}

@media (max-width: 768px) {
  .projects-grid > *,
  .project-list > * {
    flex-basis: 100%;
  }
}
</style> 