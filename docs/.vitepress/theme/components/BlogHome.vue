<script setup>
  import { ref, onMounted } from 'vue'
  import BlogDirectory from './BlogDirectory.vue'

  // 博客统计数据
  const stats = ref({
    posts: 7,
    categories: 7,
    views: 2345,
    comments: 32
  })

  // 最近更新文章
  const recentPosts = ref([
    {
      title: 'JavaScript基础知识总结',
      date: '2023-04-02',
      category: 'JavaScript',
      link: '/posts/javascript/basics'
    },
    {
      title: 'TypeScript基础类型介绍',
      date: '2023-03-28',
      category: 'TypeScript',
      link: '/posts/typescript/basics'
    },
    {
      title: 'Vue组件设计模式',
      date: '2023-03-15',
      category: 'Vue',
      link: '/posts/vue/basics'
    }
  ])

  // 博客标签
  const tags = ref([
    { name: 'JavaScript', count: 3 },
    { name: 'Vue', count: 2 },
    { name: 'React', count: 1 },
    { name: 'TypeScript', count: 2 },
    { name: '前端工程化', count: 1 },
    { name: '性能优化', count: 1 },
    { name: 'Midea实习', count: 1 }
  ])

  // 技能数据
  const skills = ref([
    { name: 'JavaScript', level: 90 },
    { name: 'Vue.js', level: 85 },
    { name: 'React', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'CSS/SCSS', level: 85 }
  ])

  // 精选推荐
  const featuredContent = ref([
    {
      title: '美的实习：我的前端成长之路',
      desc: '分享我在美的集团实习期间的技术经验和职业成长',
      link: '/posts/midea/experience',
      type: 'article'
    },
    {
      title: 'Atom-Video 视频分享平台',
      desc: '基于Vue 3和Node.js的全栈项目案例分析',
      link: '/projects/video',
      type: 'project'
    },
    {
      title: '前端性能优化实践指南',
      desc: '从实际项目中总结的性能优化技巧',
      link: '/posts/performance/overview',
      type: 'article'
    }
  ])

  // 社交链接
  const socialLinks = ref([
    { icon: 'github', name: 'GitHub', link: 'https://github.com/zjtdzyx' },
    { icon: 'twitter', name: '知乎', link: 'https://zhihu.com' },
    { icon: 'linkedin', name: '掘金', link: 'https://juejin.cn' }
  ])
</script>

<template>
  <div class="blog-home">
    <!-- 统计卡片区域 -->
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-value">{{ stats.posts }}</div>
        <div class="stat-label">文章</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-value">{{ stats.categories }}</div>
        <div class="stat-label">分类</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">👁️</div>
        <div class="stat-value">{{ stats.views }}</div>
        <div class="stat-label">浏览</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💬</div>
        <div class="stat-value">{{ stats.comments }}</div>
        <div class="stat-label">评论</div>
      </div>
    </div>

    <!-- 三列布局 -->
    <div class="blog-home-columns">
      <!-- 左侧列 - 文章分类 -->
      <div class="blog-home-column left">
        <div class="section-title">
          <h2>文章分类</h2>
          <div class="section-line"></div>
        </div>
        <BlogDirectory />
      </div>

      <!-- 中间列 - 最近更新 -->
      <div class="blog-home-column middle">
        <div class="section-title">
          <h2>最近更新</h2>
          <div class="section-line"></div>
        </div>
        <div class="recent-posts">
          <a v-for="post in recentPosts" :key="post.link" :href="post.link" class="post-card">
            <div class="post-category">{{ post.category }}</div>
            <h3 class="post-title">{{ post.title }}</h3>
            <div class="post-meta">
              <span class="post-date">{{ post.date }}</span>
            </div>
          </a>
        </div>
      </div>

      <!-- 右侧列 - 个人资料和推荐 -->
      <div class="blog-home-column right">
        <!-- 个人简介卡片 -->
        <div class="profile-card">
          <div class="profile-header">
            <img src="/avatar.png" alt="ZYX" class="profile-avatar" />
            <div class="profile-info">
              <h3 class="profile-name">ZYX</h3>
              <p class="profile-title">前端开发工程师 | 动漫爱好者</p>
            </div>
          </div>
          <div class="profile-bio">
            <p>热爱前端开发，专注于Vue和React生态。目前在Midea实习，参与广汽研究所Web、企业微信、APP端的开发。同时也在思考、开发Atom系列作品。</p>
          </div>
          <div class="profile-skills">
            <div class="skill-item" v-for="skill in skills" :key="skill.name">
              <div class="skill-info">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>
          <div class="profile-social">
            <a v-for="social in socialLinks" :key="social.name" :href="social.link" target="_blank" class="social-link">
              {{ social.name }}
            </a>
          </div>
        </div>

        <!-- 精选推荐 -->
        <div class="featured-section">
          <div class="section-title">
            <h2>精选推荐</h2>
            <div class="section-line"></div>
          </div>
          <div class="featured-content">
            <a v-for="item in featuredContent" :key="item.title" :href="item.link" class="featured-item">
              <div class="featured-type" :class="item.type">{{ item.type === 'article' ? '文章' : '项目' }}</div>
              <h4 class="featured-title">{{ item.title }}</h4>
              <p class="featured-desc">{{ item.desc }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 标签云区域 -->
    <div class="section-title">
      <h2>标签云</h2>
      <div class="section-line"></div>
    </div>
    <div class="tags-cloud">
      <a v-for="tag in tags" :key="tag.name" :href="`/posts/${tag.name.toLowerCase()}/`" class="tag">
        {{ tag.name }} <span class="tag-count">{{ tag.count }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
  .blog-home {
    padding: 1rem 0;
  }

  /* 三列布局 */
  .blog-home-columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .blog-home-column {
    display: flex;
    flex-direction: column;
  }

  .blog-home-column.left,
  .blog-home-column.middle {
    min-width: 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    margin: 2.5rem 0 1rem;
  }

  .section-title h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    padding-right: 1rem;
    white-space: nowrap;
  }

  .section-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, var(--vp-c-brand) 0%, transparent 100%);
  }

  /* 统计卡片样式 */
  .stats-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: var(--vp-c-bg-soft);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
    background: linear-gradient(135deg, var(--vp-c-bg-soft), var(--vp-c-bg));
  }

  .stat-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .stat-label {
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
  }

  /* 最近文章样式 */
  .recent-posts {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .post-card {
    background: var(--vp-c-bg-soft);
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    text-decoration: none;
    color: var(--vp-c-text-1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.08);
  }

  .post-category {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: var(--vp-c-brand-dimm);
    color: var(--vp-c-brand-dark);
    border-radius: 4px;
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }

  .post-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    line-height: 1.4;
  }

  .post-meta {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
  }

  .post-date {
    display: flex;
    align-items: center;
  }

  .post-date::before {
    content: "📅";
    margin-right: 0.25rem;
  }

  /* 个人资料卡片样式 */
  .profile-card {
    background: var(--vp-c-bg-soft);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 2rem;
    transition: all 0.3s ease;
  }

  .profile-card:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
  }

  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .profile-avatar {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .profile-info {
    margin-left: 1rem;
  }

  .profile-name {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
    background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .profile-title {
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
    margin: 0;
  }

  .profile-bio {
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--vp-c-text-2);
  }

  .profile-skills {
    margin-bottom: 1.5rem;
  }

  .skill-item {
    margin-bottom: 0.75rem;
  }

  .skill-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    font-size: 0.85rem;
  }

  .skill-name {
    font-weight: 500;
  }

  .skill-level {
    color: var(--vp-c-text-2);
  }

  .skill-bar {
    height: 6px;
    background-color: var(--vp-c-bg);
    border-radius: 3px;
    overflow: hidden;
  }

  .skill-progress {
    height: 100%;
    background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
    border-radius: 3px;
  }

  .profile-social {
    display: flex;
    gap: 0.75rem;
  }

  .social-link {
    display: inline-block;
    padding: 0.4rem 0.75rem;
    border-radius: 4px;
    font-size: 0.85rem;
    background-color: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .social-link:hover {
    background-color: var(--vp-c-brand-dimm);
    color: var(--vp-c-brand);
    transform: translateY(-2px);
  }

  /* 精选推荐样式 */
  .featured-section {
    margin-top: 1rem;
  }

  .featured-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .featured-item {
    background: var(--vp-c-bg);
    border-radius: 12px;
    padding: 1.25rem;
    text-decoration: none;
    color: var(--vp-c-text-1);
    border-left: 3px solid var(--vp-c-brand);
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .featured-item:hover {
    transform: translateX(5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }

  .featured-type {
    display: inline-block;
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    margin-bottom: 0.75rem;
  }

  .featured-type.article {
    background-color: rgba(60, 140, 255, 0.1);
    color: var(--vp-c-brand);
  }

  .featured-type.project {
    background-color: rgba(66, 211, 146, 0.1);
    color: #42d392;
  }

  .featured-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }

  .featured-desc {
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
    margin: 0;
  }

  /* 标签云样式 */
  .tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .tag {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--vp-c-bg-soft);
    border-radius: 20px;
    font-size: 0.9rem;
    text-decoration: none;
    color: var(--vp-c-text-1);
    transition: all 0.2s ease;
  }

  .tag:hover {
    background: var(--vp-c-brand-dimm);
    color: var(--vp-c-brand-dark);
    transform: translateY(-2px);
  }

  .tag-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    margin-left: 0.5rem;
    border-radius: 10px;
    background: var(--vp-c-brand-dimm);
    color: var(--vp-c-brand);
    font-size: 0.75rem;
  }

  /* 响应式适配 */
  @media (max-width: 1200px) {
    .blog-home-columns {
      grid-template-columns: 1fr 1fr;
    }

    .blog-home-column.right {
      grid-column: span 2;

      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .featured-section {
      margin-top: 0;
    }
  }

  @media (max-width: 968px) {
    .blog-home-columns {
      grid-template-columns: 1fr;
    }

    .blog-home-column.right {
      grid-column: span 1;
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 768px) {
    .stats-container {
      grid-template-columns: repeat(2, 1fr);
    }

    .section-title h2 {
      font-size: 1.3rem;
    }
  }
</style>