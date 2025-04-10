<template>
  <div class="tag-posts">
    <div v-if="!currentTag" class="tag-posts-empty">
      <p>请从上方标签云中选择一个标签查看相关文章</p>
    </div>

    <div v-else class="tag-posts-content">
      <h2 :id="currentTag" class="tag-posts-title">
        标签：{{ currentTag }}
        <span class="tag-posts-count">({{ taggedPosts.length }}篇文章)</span>
      </h2>

      <div class="posts-list">
        <div v-for="post in taggedPosts" :key="post.link" class="post-item">
          <a :href="post.link" class="post-link">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-meta">
              <span v-if="post.date" class="post-date">{{ formatDate(post.date) }}</span>
              <div class="post-tags">
                <span v-for="tag in post.tags" :key="tag" class="post-tag" :class="{ active: tag === currentTag }"
                  @click.prevent="navigateToTag(tag)">
                  {{ tag }}
                </span>
              </div>
            </div>
            <div v-if="post.description" class="post-description">{{ post.description }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { useData } from 'vitepress'

  const { theme } = useData()

  // 当前选中的标签
  const currentTag = ref('')
  // 当前标签下的所有文章
  const taggedPosts = ref([])
  // 所有带标签的文章
  const allTaggedPosts = ref([])

  // 从URL获取当前标签
  const getTagFromUrl = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash && hash.startsWith('#')) {
        return decodeURIComponent(hash.slice(1))
      }
    }
    return ''
  }

  // 导航到特定标签
  const navigateToTag = (tag) => {
    if (typeof window !== 'undefined') {
      window.location.hash = encodeURIComponent(tag)
    }
  }

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

  // 收集所有带标签的文章
  const collectPosts = async () => {
    const allPages = theme.value.sidebar ? [...Object.values(theme.value.sidebar).flat()].flatMap(section => section.items || []) : []

    const posts = []

    // 处理并发请求
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

          // 提取描述
          const descMatch = frontmatter.match(/description:\s*(.*?)(?:\n|$)/)
          const description = descMatch ? descMatch[1].trim().replace(/^['"](.*)['"]$/, '$1') : ''

          // 提取日期
          const dateMatch = frontmatter.match(/date:\s*(.*?)(?:\n|$)/)
          const date = dateMatch ? dateMatch[1].trim() : ''

          // 提取标签
          const tagsMatch = frontmatter.match(/tags:\s*\n([\s\S]*?)(?:\n\w|$)/)
          if (tagsMatch && tagsMatch[1]) {
            const tagLines = tagsMatch[1].split('\n').filter(line => line.trim().startsWith('-'))
            const tags = tagLines.map(line => line.replace(/^\s*-\s*/, '').trim().replace(/^['"](.*)['"]$/, '$1'))

            if (tags.length > 0) {
              posts.push({
                title,
                description,
                date,
                link: page.link,
                tags
              })
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching page ${page.link}:`, error)
      }
    })

    // 等待所有请求完成
    await Promise.all(promises)

    // 排序：按日期降序
    posts.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date)
      }
      return 0
    })

    allTaggedPosts.value = posts
    updateTaggedPosts()
  }

  // 根据当前标签更新文章列表
  const updateTaggedPosts = () => {
    if (!currentTag.value) {
      taggedPosts.value = []
      return
    }

    taggedPosts.value = allTaggedPosts.value.filter(post =>
      post.tags && post.tags.includes(currentTag.value)
    )
  }

  // 监听URL变化
  const setupHashChange = () => {
    if (typeof window !== 'undefined') {
      const handleHashChange = () => {
        currentTag.value = getTagFromUrl()
      }

      window.addEventListener('hashchange', handleHashChange)

      // 初始获取标签
      currentTag.value = getTagFromUrl()

      // 清理事件监听
      return () => {
        window.removeEventListener('hashchange', handleHashChange)
      }
    }
  }

  // 监听当前标签变化
  watch(currentTag, () => {
    updateTaggedPosts()
  })

  onMounted(async () => {
    setupHashChange()
    await collectPosts()
  })
</script>

<style scoped>
  .tag-posts {
    margin-top: 3rem;
  }

  .tag-posts-empty {
    padding: 2rem;
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
    text-align: center;
    font-size: 1.1rem;
    color: var(--vp-c-text-2);
  }

  .tag-posts-title {
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .tag-posts-count {
    font-size: 0.9em;
    font-weight: normal;
    color: var(--vp-c-text-2);
    margin-left: 0.5rem;
  }

  .posts-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .post-item {
    background-color: var(--vp-c-bg-soft);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .post-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .post-link {
    display: block;
    padding: 1.25rem;
    color: var(--vp-c-text-1);
    text-decoration: none;
    height: 100%;
  }

  .post-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    line-height: 1.4;
    color: var(--vp-c-brand);
  }

  .post-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
  }

  .post-date {
    padding: 0.2rem 0;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .post-tag {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    background-color: var(--vp-c-bg-mute);
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .post-tag:hover {
    background-color: var(--vp-c-brand-dimm);
  }

  .post-tag.active {
    background-color: var(--vp-c-brand);
    color: white;
  }

  .post-description {
    margin-top: 0.75rem;
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .posts-list {
      grid-template-columns: 1fr;
    }

    .post-item {
      margin-bottom: 1rem;
    }
  }
</style>