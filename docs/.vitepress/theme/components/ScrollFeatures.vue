<template>
  <div class="scroll-features">
    <!-- 阅读进度条 -->
    <div class="progress-bar" :style="{ width: scrollPercentage + '%' }"></div>
    
    <!-- 返回顶部按钮 -->
    <div 
      class="back-to-top" 
      :class="{ active: showBackToTop }"
      @click="scrollToTop"
      title="返回顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 滚动百分比
const scrollPercentage = ref(0)
// 是否显示返回顶部按钮
const showBackToTop = ref(false)
// 显示返回顶部按钮的滚动阈值（像素）
const scrollThreshold = 300

// 监听滚动事件，更新进度条和返回顶部按钮显示状态
const handleScroll = () => {
  // 计算滚动百分比
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  
  // 避免除以0错误
  if (scrollHeight > 0) {
    scrollPercentage.value = (scrollTop / scrollHeight) * 100
  } else {
    scrollPercentage.value = 0
  }
  
  // 控制返回顶部按钮显示
  showBackToTop.value = scrollTop > scrollThreshold
}

// 返回顶部功能
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 挂载和卸载事件监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // 初始调用一次
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-features {
  position: fixed;
  z-index: 100;
}

/* 阅读进度条样式 */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--vp-c-brand);
  transition: width 0.1s ease;
  z-index: 102;
}

/* 返回顶部按钮样式 */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  z-index: 101;
  color: var(--vp-c-text-1);
}

.back-to-top.active {
  opacity: 1;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--vp-c-brand);
  color: white;
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.2rem;
    height: 2.2rem;
  }
}
</style> 