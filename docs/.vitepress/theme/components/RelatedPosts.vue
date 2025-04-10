<template>
  <div class="related-posts" v-if="relatedPosts.length > 0">
    <h3 class="related-posts-title">相关文章</h3>
    <div class="related-posts-list">
      <a v-for="post in relatedPosts" :key="post.link" :href="post.link" class="related-post-item">
        <span class="related-post-title">{{ post.title }}</span>
        <span v-if="post.date" class="related-post-date">{{ formatDate(post.date) }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useData } from 'vitepress'

  const { page, theme } = useData()

  // 当前页面数据
  const currentPageData = ref({
    title: '',
    tags: [],
    path: ''
  })

  // 所有文章数据
  const allPosts = ref([])

  // 相关文章
  const relatedPosts = computed(() => {
    if (!currentPageData.value.tags || currentPageData.value.tags.length === 0) {
      return []
    }

    // 计算每篇文章的相关性得分
    const scoredPosts = allPosts.value
      .filter(post => post.path !== currentPageData.value.path) // 排除当前文章
      .map(post => {
        // 计算标签重叠数量
        const commonTags = post.tags.filter(tag =>
          currentPageData.value.tags.includes(tag)
        )

        return {
          ...post,
          score: commonTags.length
        }
      })
      .filter(post => post.score > 0) // 只保留有共同标签的文章

    // 按得分和日期排序
    scoredPosts.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      // 同分按日期降序
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date)
      }
      return 0
    })

    // 返回前5篇相关文章
    return scoredPosts.slice(0, 5)
  })

  // 格式化日期
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (e) {
      return dateString
    }
  }

  // 解析当前页面的frontmatter
  const parseCurrentPage = async () => {
    try {
      const response = await fetch(page.value.relativePath)
      const content = await response.text()

      // 解析frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
      if (frontmatterMatch && frontmatterMatch[1]) {
        const frontmatter = frontmatterMatch[1]

        // 提取标签
        const tagsMatch = frontmatter.match(/tags:\s*\n([\s\S]*?)(?:\n\w|$)/)
        if (tagsMatch && tagsMatch[1]) {
          const tagLines = tagsMatch[1].split('\n').filter(line => line.trim().startsWith('-'))
          const tags = tagLines.map(line => line.replace(/^\s*-\s*/, '').trim().replace(/^['"](.*)['"]$/, '$1'))

          currentPageData.value = {
            title: page.value.title,
            tags: tags,
            path: page.value.relativePath
          }
        }
      }
    } catch (error) {
      console.error('Error parsing current page:', error)
    }
  }

  // 收集所有文章
  const collectAllPosts = async () => {
    try {
      const allPages = theme.value.sidebar ? [...Object.values(theme.value.sidebar).flat()].flatMap(section => section.items || []) : []
      const posts = []

      const promises = allPages.map(async (page) => {
        if (!page.link) return

        try {
          const response = await fetch(page.link)
          const content = await response.text()

          // 解析frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
          if (frontmatterMatch && frontmatterMatch[1]) {
            const frontmatter = frontmatterMatch[1]

            // 提取标题
            const titleMatch = frontmatter.match(/title:\s*(.*?)(?:\n|$)/)
            const title = titleMatch ? titleMatch[1].trim().replace(/^['"](.*)['"]$/, '$1') : page.text

            // 提取日期
            const dateMatch = frontmatter.match(/date:\s*(.*?)(?:\n|$)/)
            const date = dateMatch ? dateMatch[1].trim() : ''

            // 提取标签
            const tagsMatch = frontmatter.match(/tags:\s*\n([\s\S]*?)(?:\n\w|$)/)
            if (tagsMatch && tagsMatch[1]) {
              const tagLines = tagsMatch[1].split('\n').filter(line => line.trim().startsWith('-'))
              const tags = tagLines.map(line => line.replace(/^\s*-\s*/, '').trim().replace(/^['"](.*)['"]$/, '$1'))

              posts.push({
                title,
                date,
                link: page.link,
                path: page.link.replace(/\.html$/, '.md'),
                tags
              })
            }
          }
        } catch (error) {
          console.error(`Error fetching page ${page.link}:`, error)
        }
      })

      await Promise.all(promises)
      allPosts.value = posts
    } catch (error) {
      console.error('Error collecting posts:', error)
    }
  }

  onMounted(async () => {
    await parseCurrentPage()
    await collectAllPosts()
  })
</script>

<style scoped>
  .related-posts {
    margin-top: 3rem;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: var(--vp-c-bg-soft);
  }

  .related-posts-title {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
  }

  .related-posts-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .related-post-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    background-color: var(--vp-c-bg-mute);
    color: var(--vp-c-text-1);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .related-post-item:hover {
    background-color: var(--vp-c-brand-dimm);
    transform: translateX(4px);
  }

  .related-post-title {
    font-weight: 500;
    flex: 1;
  }

  .related-post-date {
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
    margin-left: 1rem;
  }

  @media (max-width: 768px) {
    .related-post-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .related-post-date {
      margin-left: 0;
    }
  }
</style>