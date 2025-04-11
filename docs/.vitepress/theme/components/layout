<template>
  <div class="blog-article-layout">
    <div class="article-container">
      <div class="article-content">
        <slot />
      </div>
      <div class="article-sidebar">
        <ArticleTOC />
      </div>
    </div>
  </div>
</template>

<script setup>
  // 这个组件用于包装文章内容，添加侧边栏目录导航
</script>

<style scoped>
  .blog-article-layout {
    width: 100%;
    max-width: var(--vp-layout-max-width);
    margin: 0 auto;
    padding: 0 24px;
  }

  .article-container {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }

  .article-content {
    min-width: 0;
  }

  /* 对于大屏幕，启用双列布局 */
  @media (min-width: 1280px) {
    .article-container {
      grid-template-columns: minmax(0, 1fr) 18rem;
    }

    .article-sidebar {
      position: sticky;
      top: 6rem;
      height: calc(100vh - 8rem);
      overflow-y: auto;
      padding-bottom: 2rem;
    }
  }

  /* 对于小屏幕，侧边栏显示在顶部 */
  @media (max-width: 1279px) {
    .article-sidebar {
      order: -1;
    }
  }
</style>