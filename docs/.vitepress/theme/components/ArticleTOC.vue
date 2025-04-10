<template>
  <div class="article-toc-container" v-if="items.length > 0">
    <h3 class="toc-title">目录</h3>
    <ul class="toc-list">
      <li v-for="item in items" :key="item.id" class="toc-item" :class="[
        `level-${item.level}`,
        { active: activeLink === item.id }
      ]">
        <a :href="`#${item.id}`" @click="scrollToHeading(item.id, $event)">
          {{ item.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, nextTick } from 'vue'

  const items = ref([])
  const activeLink = ref('')
  const observer = ref(null)
  const headingElements = ref([])

  // 初始化时获取所有标题并生成目录
  const initTOC = async () => {
    // 等待DOM渲染
    await nextTick()

    // 获取文章内容区域
    const articleContent = document.querySelector('.vp-doc')
    if (!articleContent) return

    // 获取所有标题元素 (h2, h3, h4)
    const headings = articleContent.querySelectorAll('h2, h3, h4')
    if (headings.length === 0) return

    // 构建目录项
    const tocItems = []
    headingElements.value = []

    headings.forEach((heading) => {
      // 确保标题有id
      if (!heading.id) {
        heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-')
      }

      // 添加到目录
      tocItems.push({
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName.charAt(1)) - 1, // h2 -> 1, h3 -> 2, h4 -> 3
      })

      headingElements.value.push(heading)
    })

    items.value = tocItems

    // 创建标题元素的交叉观察器 (Intersection Observer)
    setupScrollSpy()
  }

  // 设置滚动监听，高亮当前可见的标题
  const setupScrollSpy = () => {
    if (typeof IntersectionObserver === 'undefined') return

    // 如果已经有观察器，则断开连接
    if (observer.value) {
      observer.value.disconnect()
    }

    // 创建新的交叉观察器
    observer.value = new IntersectionObserver(
      (entries) => {
        // 收集所有可见的标题
        const visibleHeadings = []
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.push(entry.target)
          }
        })

        // 如果有可见标题，则使用第一个作为活动链接
        if (visibleHeadings.length > 0) {
          activeLink.value = visibleHeadings[0].id
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0
      }
    )

    // 开始观察所有标题元素
    headingElements.value.forEach((heading) => {
      observer.value.observe(heading)
    })
  }

  // 处理目录项点击，平滑滚动到对应标题
  const scrollToHeading = (id, event) => {
    event.preventDefault()

    const element = document.getElementById(id)
    if (element) {
      // 获取导航栏的高度以调整滚动位置
      const navHeight = document.querySelector('.VPNav').offsetHeight || 0
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - navHeight - 20

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })

      // 更新URL哈希
      history.pushState(null, null, `#${id}`)

      // 更新活动链接
      activeLink.value = id
    }
  }

  // 监听窗口大小变化，更新Intersection Observer
  const handleResize = () => {
    setupScrollSpy()
  }

  onMounted(() => {
    initTOC()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
    window.removeEventListener('resize', handleResize)
  })
</script>

<style scoped>
  .article-toc-container {
    position: sticky;
    top: 80px;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    background-color: var(--vp-c-bg-soft);
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }

  .toc-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.8rem 0;
    color: var(--vp-c-text-1);
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .toc-item {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    line-height: 1.4;
    padding-left: 0.5rem;
  }

  .toc-item a {
    display: block;
    color: var(--vp-c-text-2);
    text-decoration: none;
    transition: color 0.2s, transform 0.2s;
    border-left: 2px solid transparent;
    padding-left: 0.5rem;
  }

  .toc-item a:hover {
    color: var(--vp-c-brand);
    transform: translateX(2px);
  }

  .toc-item.active>a {
    color: var(--vp-c-brand);
    border-left-color: var(--vp-c-brand);
    font-weight: 500;
  }

  /* 多级缩进 */
  .toc-item.level-1 {
    padding-left: 0;
  }

  .toc-item.level-2 {
    padding-left: 1rem;
    font-size: 0.85rem;
  }

  .toc-item.level-3 {
    padding-left: 2rem;
    font-size: 0.8rem;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .article-toc-container {
      position: relative;
      top: 0;
      max-height: none;
      margin-bottom: 2rem;
    }
  }
</style>