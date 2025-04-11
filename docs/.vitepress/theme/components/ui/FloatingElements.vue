<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import { useData } from 'vitepress'

  const { isDark } = useData()

  // 相关状态
  const showBackToTop = ref(false)
  const progress = ref(0)
  const initialTheme = ref(isDark.value)

  // 监听滚动事件
  const scrollHandler = () => {
    // 计算滚动百分比
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight

    progress.value = Math.floor((scrollTop / (scrollHeight - clientHeight)) * 100)

    // 显示/隐藏返回顶部按钮
    showBackToTop.value = scrollTop > 300
  }

  // 返回顶部
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // 生命周期钩子
  onMounted(() => {
    window.addEventListener('scroll', scrollHandler)
    scrollHandler() // 初始化状态

    // 初始化主题
    initialTheme.value = isDark.value
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler)
  })
</script>

<template>
  <div class="floating-elements">
    <!-- 进度条 -->
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
    </div>

    <!-- 返回顶部按钮 -->
    <div class="back-to-top" :class="{ 'show': showBackToTop }" @click="backToTop" role="button" aria-label="返回顶部">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-up">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
  .floating-elements {
    position: fixed;
    z-index: 100;
  }

  /* 进度条样式 */
  .progress-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    z-index: 9999;
  }

  .progress-bar {
    height: 100%;
    background-color: var(--vp-c-brand);
    width: 0%;
    transition: width 0.2s ease;
  }

  /* 返回顶部按钮样式 */
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--vp-c-bg-alt);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s, transform 0.3s;
    color: var(--vp-c-text);
    border: 1px solid var(--vp-c-divider);
  }

  .back-to-top.show {
    opacity: 1;
    transform: translateY(0);
  }

  .back-to-top:hover {
    background-color: var(--vp-c-bg-soft);
  }

  .back-to-top:active {
    transform: translateY(2px);
  }

  .arrow-up {
    height: 1.25rem;
    width: 1.25rem;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .back-to-top {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 2.5rem;
      height: 2.5rem;
    }
  }
</style>