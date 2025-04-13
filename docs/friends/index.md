---
layout: page
title: 友情链接
description: 与我成为朋友
sidebar: false
---

<script setup>
import { ref } from 'vue'
import FriendCard from '../.vitepress/theme/components/ui/FriendCard.vue'

const friends = ref([
  {
    name: 'zyx',
    avatar: '/avatar.png',
    description: '前端开发工程师，希望成为一名顶级的工程师。热爱动漫与生活！',
    link: 'https://zjtxzyx.xyz',
    backgroundColor: 'rgba(var(--vp-c-brand-rgb), 0.05)'
  },
  // 这里可以添加更多友链
])

const categories = ref([
  '全部',
  '技术博客',
  '设计灵感',
  '生活随笔'
])

const currentCategory = ref('全部')
</script>

<div class="friends-page">
  <div class="friends-header">
    <h1>与优秀的人同行，是一种幸福</h1>
  </div>

  <div class="friends-grid">
    <FriendCard
      v-for="friend in friends"
      :key="friend.name"
      v-bind="friend"
    />
  </div>

  <div class="friends-apply">
    <h2>申请友链</h2>
    <div class="apply-card">
      <div class="apply-info">
        <p>如果您想与我交换友链，请确保您的网站满足以下条件：</p>
        <ul>
          <li>网站内容健康向上，无不良信息</li>
          <li>网站稳定运行，访问流畅</li>
          <li>网站已有一定数量的原创内容</li>
          <li>网站有独立域名和 HTTPS 证书</li>
        </ul>
      </div>
      <div class="apply-format">
        <h3>申请格式</h3>
        <pre>
名称：您的网站名称
简介：一句话介绍您的网站
链接：您的网站链接
头像：您的头像链接（推荐尺寸 128x128）</pre>
      </div>
    </div>
  </div>
</div>

<style scoped>
.friends-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.friends-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.friends-header h1 {
  font-size: 2.5rem;
  background: linear-gradient(45deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.friends-apply {
  max-width: 800px;
  margin: 0 auto;
}

.friends-apply h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  background: linear-gradient(45deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.apply-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.1);
  backdrop-filter: blur(10px);
}

.apply-info ul {
  margin: 1rem 0;
  padding-left: 1.2rem;
}

.apply-info li {
  margin: 0.8rem 0;
  color: var(--vp-c-text-2);
  position: relative;
}

.apply-info li::before {
  content: '•';
  color: var(--vp-c-brand);
  font-weight: bold;
  position: absolute;
  left: -1rem;
}

.apply-format {
  margin-top: 2rem;
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
}

.apply-format h3 {
  margin-bottom: 1rem;
  color: var(--vp-c-brand);
}

.apply-format pre {
  margin: 0;
  white-space: pre-wrap;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .friends-grid {
    grid-template-columns: 1fr;
  }
  
  .friends-header h1 {
    font-size: 2rem;
  }
  
  .apply-card {
    padding: 1.5rem;
  }
}
</style>