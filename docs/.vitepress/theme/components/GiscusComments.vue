<template>
  <div class="giscus-comments">
    <h3 class="comments-title">评论</h3>
    <div class="giscus-container" ref="commentsContainer"></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useData, useRoute } from 'vitepress'

  const { isDark } = useData()
  const route = useRoute()
  const commentsContainer = ref(null)

  // 评论组件加载状态
  const commentsLoaded = ref(false)

  // Giscus配置
  const giscusConfig = {
    repo: 'zjtdzyx/my-blog',          // 您的仓库
    repoId: 'R_kgDOLYzAMg',           // 您的仓库ID
    category: 'Announcements',         // 讨论分类
    categoryId: 'DIC_kwDOLYzAMs4CdnGl', // 讨论分类ID
    mapping: 'pathname',               // 页面和讨论的映射关系
    reactionsEnabled: '1',             // 启用主帖子上的反应
    emitMetadata: '0',                 // 不向父窗口发送元数据
    inputPosition: 'top',              // 输入框位置
    lang: 'zh-CN',                     // 语言
    loading: 'lazy',                   // 加载方式
  }

  // 加载Giscus评论
  const loadComments = () => {
    if (commentsLoaded.value) {
      return
    }

    // 创建script元素
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', giscusConfig.repo)
    script.setAttribute('data-repo-id', giscusConfig.repoId)
    script.setAttribute('data-category', giscusConfig.category)
    script.setAttribute('data-category-id', giscusConfig.categoryId)
    script.setAttribute('data-mapping', giscusConfig.mapping)
    script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled)
    script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata)
    script.setAttribute('data-input-position', giscusConfig.inputPosition)
    script.setAttribute('data-lang', giscusConfig.lang)
    script.setAttribute('data-loading', giscusConfig.loading)
    script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    // 清除容器
    if (commentsContainer.value) {
      commentsContainer.value.innerHTML = ''
      commentsContainer.value.appendChild(script)
      commentsLoaded.value = true
    }
  }

  // 向Giscus发送主题变更消息
  const updateGiscusTheme = () => {
    const theme = isDark.value ? 'dark' : 'light'
    const iframe = document.querySelector('.giscus-frame')
    if (iframe) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app'
      )
    }
  }

  // 当路由变化时重新加载评论
  watch(
    () => route.path,
    () => {
      commentsLoaded.value = false
      loadComments()
    }
  )

  // 当主题变化时更新Giscus主题
  watch(
    isDark,
    () => {
      updateGiscusTheme()
    }
  )

  onMounted(() => {
    loadComments()
  })
</script>

<style scoped>
  .giscus-comments {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--vp-c-divider);
  }

  .comments-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
  }

  /* 移动端适配 */
  @media (max-width: 768px) {
    .giscus-comments {
      margin-top: 3rem;
      padding-top: 1.5rem;
    }

    .comments-title {
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }
  }
</style>