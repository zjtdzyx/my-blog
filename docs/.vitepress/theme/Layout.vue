<script setup>
  import DefaultTheme from 'vitepress/theme'
  import { onMounted, watch, ref } from 'vue'
  import { useRoute, useData } from 'vitepress'
  import FloatingElements from './FloatingElements.vue'
  import CustomNav from './components/CustomNav.vue'

  const { Layout } = DefaultTheme
  const route = useRoute()
  const { isDark } = useData()

  // 导航栏滚动效果
  const handleScroll = () => {
    const nav = document.querySelector('.VPNav')
    if (nav) {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }
  }

  onMounted(() => {
    // 添加滚动监听
    window.addEventListener('scroll', handleScroll)

    // 初始检查
    handleScroll()

    // 在夜间模式切换时触发更新
    watch(isDark, () => {
      // 等待DOM更新
      setTimeout(() => {
        handleScroll()
      }, 100)
    })
  })
</script>

<template>
  <Layout>
    <template #layout-top>
      <FloatingElements v-if="route.path === '/'" />
    </template>
    <template #nav-bar-content-before>
      <CustomNav class="custom-nav-container" />
    </template>
  </Layout>
</template>

<style>
  /* 确保全局样式能应用 */
  .custom-nav-container {
    margin-left: 32px;
  }
  
  /* 主导航在使用自定义导航时隐藏 */
  .VPNavBarMenu {
    display: none !important;
  }
  
  /* 移动端样式 */
  @media (max-width: 768px) {
    .custom-nav-container {
      display: none;
    }
    
    .VPNavBarMenu {
      display: flex !important;
    }
  }
</style>