<script setup>
import { ref, onMounted } from 'vue'

const themes = [
  { id: 'default', name: '默认蓝色', color: '#3c8cff' },
  { id: 'green', name: '清新绿色', color: '#10b981' },
  { id: 'purple', name: '优雅紫色', color: '#8b5cf6' },
  { id: 'orange', name: '活力橙色', color: '#f59e0b' }
]

const currentTheme = ref('default')

// 应用主题到HTML元素
const applyTheme = (themeId) => {
  // 首先移除所有主题类
  document.documentElement.classList.remove('theme-green', 'theme-purple', 'theme-orange')
  
  // 如果不是默认主题，添加对应的类
  if (themeId !== 'default') {
    document.documentElement.classList.add(`theme-${themeId}`)
  }
  
  // 保存到本地存储
  localStorage.setItem('theme-color', themeId)
  currentTheme.value = themeId
}

// 初始化主题
onMounted(() => {
  const savedTheme = localStorage.getItem('theme-color') || 'default'
  applyTheme(savedTheme)
})
</script>

<template>
  <div class="theme-switcher">
    <div class="theme-switcher-title">主题色彩</div>
    <div class="theme-options">
      <button 
        v-for="theme in themes" 
        :key="theme.id"
        :class="['theme-option', { active: currentTheme === theme.id }]"
        :style="{ backgroundColor: theme.color }"
        :title="theme.name"
        @click="applyTheme(theme.id)"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.theme-switcher {
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  margin-bottom: 1rem;
}

.theme-switcher-title {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-2);
}

.theme-options {
  display: flex;
  gap: 0.5rem;
}

.theme-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.theme-option:hover {
  transform: scale(1.1);
}

.theme-option.active {
  border-color: var(--vp-c-text-1);
  transform: scale(1.1);
}
</style> 