<script setup>
import { useData } from 'vitepress'
import { ref, computed, onMounted } from 'vue'

const { theme } = useData()
const categories = ref([
  { name: 'JavaScript', icon: '📜', path: '/posts/javascript/' },
  { name: 'TypeScript', icon: '🔷', path: '/posts/typescript/' },
  { name: 'Vue', icon: '🟢', path: '/posts/vue/' },
  { name: 'React', icon: '⚛️', path: '/posts/react/' },
  { name: '前端工程化', icon: '🔧', path: '/posts/engineering/' },
  { name: '性能优化', icon: '⚡', path: '/posts/performance/' },
  { name: 'Midea实习', icon: '🏢', path: '/posts/midea/' },
])

// 获取当前激活的分类
const activeCategory = ref('')

// 当前选中分类的文章列表
const articles = ref([])

// 从侧边栏数据中获取文章
const getArticlesForCategory = (path) => {
  const sidebar = theme.value.sidebar
  const categoryData = sidebar[path]
  
  if (!categoryData || !categoryData.length || !categoryData[0].items) {
    return []
  }
  
  return categoryData[0].items.map(item => ({
    title: item.text,
    link: item.link
  }))
}

// 切换分类
const selectCategory = (category) => {
  activeCategory.value = category.path
  articles.value = getArticlesForCategory(category.path)
}

onMounted(() => {
  // 默认选中第一个分类
  if (categories.value.length > 0) {
    selectCategory(categories.value[0])
  }
})
</script>

<template>
  <div class="blog-directory">
    <div class="category-tabs">
      <div 
        v-for="category in categories" 
        :key="category.path"
        :class="['category-tab', { active: activeCategory === category.path }]"
        @click="selectCategory(category)"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <span class="category-name">{{ category.name }}</span>
      </div>
    </div>
    
    <div class="articles-list">
      <div v-if="articles.length === 0" class="no-articles">
        暂无文章
      </div>
      <a 
        v-for="article in articles" 
        :key="article.link" 
        :href="article.link"
        class="article-item"
      >
        <div class="article-title">{{ article.title }}</div>
        <div class="article-arrow">→</div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.blog-directory {
  margin: 2rem 0;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.category-tabs {
  display: flex;
  overflow-x: auto;
  padding: 0.5rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.category-tab {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.category-tab:hover {
  background: var(--vp-c-bg-soft);
}

.category-tab.active {
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand);
}

.category-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.articles-list {
  padding: 1rem;
}

.article-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg);
  transition: all 0.2s ease;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.article-item:hover {
  background: var(--vp-c-bg-soft);
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.article-arrow {
  font-size: 1.2rem;
  opacity: 0.5;
  transition: all 0.2s ease;
}

.article-item:hover .article-arrow {
  opacity: 1;
  transform: translateX(3px);
  color: var(--vp-c-brand);
}

.no-articles {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .category-tabs {
    padding: 0.5rem 0;
  }
  
  .category-tab {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
  
  .article-item {
    padding: 0.5rem 0.75rem;
  }
}
</style> 