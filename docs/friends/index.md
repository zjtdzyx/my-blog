---
layout: page
title: 友情链接
description: 与我成为朋友
sidebar: false
---

<script setup>
import { ref, computed } from 'vue'
import FriendCard from '../.vitepress/theme/components/ui/FriendCard.vue'

// 友链数据
const friends = ref([
  {
    name: 'zyx',
    avatar: '/avatar.png',
    description: '前端开发工程师，希望成为一名顶级的工程师。热爱动漫与生活！',
    link: 'https://zjtdzyx.xyz',
    backgroundColor: 'rgba(var(--vp-c-brand-rgb), 0.05)',
    category: '技术博客'
  },
  {
    name: 'zephyrl',
    avatar: '/zephyrlin.png',
    description: 'zephyr的next.js个人网站。腾讯工程师。',
    link: 'https://zephyrlin.me',
    backgroundColor: 'rgba(var(--vp-c-brand-rgb), 0.05)',
    category: '技术博客'
  },
   {
    name: 'Keldos',
    avatar: '/Keldos.png',
    description: '浙大本硕。typora-latex-theme的开创者。一位UI/UX上颇具造诣的人！',
    link: 'https://blog.keldos.me/',
    backgroundColor: 'rgba(var(--vp-c-brand-rgb), 0.05)',
    category: '生活随笔'
  },
    {
    name: 'Wafer Desu',
    avatar: '/WaferDesu.png',
    description: '东京大学硕士。Go语言后端工程师。',
    link: 'https://blog.keldos.me/',
    backgroundColor: 'rgba(var(--vp-c-brand-rgb), 0.05)',
    category: '技术博客'
  },
     {
    name: 'ziwen',
    avatar: '/ziwen.png',
    description: '来自小红书的优秀的前端工程师！',
    link: ' https://www.ziwen.icu/',
    backgroundColor: 'rgba(var(--vp-c-brand-rgb), 0.05)',
    category: '技术博客'
  },
       {
    name: 'lhllhllhl',
    avatar: '/lhllhllhl.png',
    description: 'Java后端开发工程师',
    link: 'https://blog.csdn.net/lhllhllhl_?type=blog',
    backgroundColor: 'rgba(var(--vp-c-brand-rgb), 0.05)',
    category: '技术博客'
  },
       {
    name: 'zyp',
    avatar: '/zyp.png',
    description: 'Java后端开发工程师',
    link: ' https://github.com/zyp20221/',
    backgroundColor: 'rgba(var(--vp-c-brand-rgb), 0.05)',
    category: '技术博客'
  }
  // 这里可以添加更多友链
])

const categories = ref([
  '全部',
  '技术博客',
  '设计灵感',
  '生活随笔'
])

const currentCategory = ref('全部')

// 根据分类筛选友链
const filteredFriends = computed(() => {
  if (currentCategory.value === '全部') {
    return friends.value
  }
  return friends.value.filter(friend => friend.category === currentCategory.value)
})
</script>

<div class="friends-page">
  <div class="friends-header">
    <h1>来自不同领域的优秀朋友</h1>
    <p class="friends-subtitle">与优秀的人同行，是一种幸福</p>
  </div>
  
  <div class="categories-container">
    <button 
      v-for="category in categories" 
      :key="category"
      :class="['category-btn', currentCategory === category ? 'active' : '']"
      @click="currentCategory = category"
    >
      <span class="btn-text">{{ category }}</span>
    </button>
  </div>

  <div class="friends-grid">
    <FriendCard
      v-for="friend in filteredFriends"
      :key="friend.name"
      v-bind="friend"
    />
    <div v-if="filteredFriends.length === 0" class="empty-message">
      该分类下暂无友链
    </div>
  </div>

  <div class="friends-apply">
    <div class="apply-header">
      <div class="apply-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      </div>
      <h2>申请友链</h2>
    </div>
    <div class="apply-card">
      <div class="apply-info">
        <p>如果您想与我交换友链，请确保您的网站满足以下条件：</p>
        <ul>
          <li><span class="check-icon">✓</span> 网站内容健康向上，无不良信息</li>
          <li><span class="check-icon">✓</span> 网站稳定运行，访问流畅</li>
          <li><span class="check-icon">✓</span> 网站已有一定数量的原创内容</li>
          <li><span class="check-icon">✓</span> 网站有独立域名和 HTTPS 证书</li>
        </ul>
      </div>
      <div class="apply-divider"></div>
      <div class="apply-format">
        <h3>申请格式</h3>
        <div class="format-card">
          <div class="format-field">
            <span class="field-name">名称：</span>
            <span class="field-value">您的网站名称</span>
          </div>
          <div class="format-field">
            <span class="field-name">简介：</span>
            <span class="field-value">一句话介绍您的网站</span>
          </div>
          <div class="format-field">
            <span class="field-name">链接：</span>
            <span class="field-value">您的网站链接</span>
          </div>
          <div class="format-field">
            <span class="field-name">头像：</span>
            <span class="field-value">您的头像链接（推荐尺寸 128x128）</span>
          </div>
          <div class="format-field">
            <span class="field-name">分类：</span>
            <span class="field-value">您的网站分类</span>
          </div>
        </div>
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

/* 头部样式 */
.friends-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding-top: 2rem;
}

.header-decoration {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, 
    rgba(var(--vp-c-brand-rgb), 0) 0%, 
    rgba(var(--vp-c-brand-rgb), 1) 50%, 
    rgba(var(--vp-c-brand-rgb), 0) 100%);
}

.friends-header h1 {
  font-size: 2.5rem;
  background: linear-gradient(45deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.friends-subtitle {
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  margin: 0.5rem 0 0;
}

/* 分类按钮样式 */
.categories-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  background: var(--vp-c-bg-soft);
  padding: 1rem 2rem;
  border-radius: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  max-width: 90%;
  margin: 0 auto 3rem;
}

.category-btn {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 20px;
  background: transparent;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;
}

.category-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  border-radius: 20px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  z-index: 0;
}

.category-btn .btn-text {
  position: relative;
  z-index: 1;
}

.category-btn:hover::before {
  transform: scaleX(1);
}

.category-btn.active {
  background: linear-gradient(45deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3);
}

/* 友链网格样式 */
.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.empty-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
}

/* 申请友链部分样式 */
.friends-apply {
  max-width: 800px;
  margin: 5rem auto 0;
}

.apply-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.apply-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 1rem;
}

.apply-header h2 {
  font-size: 1.8rem;
  background: linear-gradient(45deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.apply-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(var(--vp-c-brand-rgb), 0.1);
  backdrop-filter: blur(10px);
}

.apply-info ul {
  margin: 1rem 0;
  padding: 0;
  list-style: none;
}

.apply-info li {
  margin: 1rem 0;
  color: var(--vp-c-text-2);
  position: relative;
  padding-left: 2rem;
  display: flex;
  align-items: center;
}

.check-icon {
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
  font-weight: bold;
  font-size: 1rem;
}

.apply-divider {
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(var(--vp-c-brand-rgb), 0) 0%, 
    rgba(var(--vp-c-brand-rgb), 0.2) 50%, 
    rgba(var(--vp-c-brand-rgb), 0) 100%);
  margin: 2rem 0;
}

.apply-format h3 {
  font-size: 1.4rem;
  margin: 0 0 1.5rem;
  position: relative;
  display: inline-block;
  color: var(--vp-c-text-1);
}

.apply-format h3::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 3px;
  background: var(--vp-c-brand);
  border-radius: 3px;
}

.format-card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 1.5rem;
}

.format-field {
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
}

.format-field:last-child {
  margin-bottom: 0;
}

.field-name {
  color: var(--vp-c-brand);
  font-weight: 600;
  min-width: 60px;
}

.field-value {
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .friends-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  .categories-container {
    padding: 0.8rem 1.5rem;
  }
  
  .category-btn {
    padding: 0.4rem 1.2rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 640px) {
  .friends-grid {
    grid-template-columns: 1fr;
  }
  
  .friends-header h1 {
    font-size: 2rem;
  }
  
  .categories-container {
    border-radius: 12px;
    padding: 0.8rem;
    gap: 0.5rem;
  }
  
  .category-btn {
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
  }
  
  .apply-card {
    padding: 1.5rem;
  }
}
</style>