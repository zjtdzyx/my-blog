<template>
  <div class="tag-cloud">
    <h2 class="tag-cloud-title">标签云</h2>
    <div class="tag-cloud-container">
      <router-link v-for="tag in tagList" :key="tag.name" :to="`/tags.html#${encodeURIComponent(tag.name)}`"
        class="tag-item" :style="{
          fontSize: `${getTagSize(tag.count)}rem`,
          backgroundColor: getTagColor(tag.name)
        }">
        {{ tag.name }} <span class="tag-count">{{ tag.count }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useData } from 'vitepress'

  const { theme } = useData()

  // 标签列表，包含标签名称和出现次数
  const tagList = ref([])
  // 最大和最小标签出现次数
  const maxCount = ref(1)
  const minCount = ref(1)

  // 从所有页面中收集标签
  const collectTags = () => {
    const allPages = theme.value.sidebar ? [...Object.values(theme.value.sidebar).flat()].flatMap(section => section.items || []) : []

    const tags = {}

    // 遍历所有页面，收集标签
    allPages.forEach(page => {
      if (!page.link) return

      // 获取页面的frontmatter数据
      fetch(page.link)
        .then(response => response.text())
        .then(content => {
          // 简单解析frontmatter
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
          if (frontmatterMatch && frontmatterMatch[1]) {
            const frontmatter = frontmatterMatch[1]

            // 解析tags
            const tagsMatch = frontmatter.match(/tags:\s*\n([\s\S]*?)(?:\n\w|$)/)
            if (tagsMatch && tagsMatch[1]) {
              const tagLines = tagsMatch[1].split('\n').filter(line => line.trim().startsWith('-'))
              const pageTags = tagLines.map(line => line.replace(/^\s*-\s*/, '').trim().replace(/^['"](.*)['"]$/, '$1'))

              // 更新标签计数
              pageTags.forEach(tag => {
                if (tag) {
                  tags[tag] = (tags[tag] || 0) + 1
                }
              })

              // 更新标签列表
              updateTagList(tags)
            }
          }
        })
        .catch(error => {
          console.error('Error fetching page content:', error)
        })
    })
  }

  // 更新标签列表
  const updateTagList = (tags) => {
    const newTagList = Object.entries(tags).map(([name, count]) => ({ name, count }))

    // 更新最大和最小计数
    if (newTagList.length > 0) {
      maxCount.value = Math.max(...newTagList.map(tag => tag.count))
      minCount.value = Math.min(...newTagList.map(tag => tag.count))
    }

    // 排序标签：按计数降序，同计数按名称字母顺序
    newTagList.sort((a, b) => {
      if (a.count !== b.count) {
        return b.count - a.count
      }
      return a.name.localeCompare(b.name)
    })

    tagList.value = newTagList
  }

  // 根据标签出现次数计算字体大小（0.8rem 到 1.6rem）
  const getTagSize = (count) => {
    if (maxCount.value === minCount.value) return 1.2
    const size = 0.8 + ((count - minCount.value) / (maxCount.value - minCount.value)) * 0.8
    return size.toFixed(1)
  }

  // 根据标签名称生成一个一致的颜色
  const getTagColor = (tagName) => {
    // 简单的字符串哈希函数
    let hash = 0
    for (let i = 0; i < tagName.length; i++) {
      hash = tagName.charCodeAt(i) + ((hash << 5) - hash)
    }

    // 将哈希转换为HSL颜色，保持饱和度和亮度一致以确保可读性
    const h = Math.abs(hash % 360)
    return `hsl(${h}, 70%, 80%)`
  }

  // 在组件挂载后收集标签
  onMounted(() => {
    collectTags()
  })
</script>

<style scoped>
  .tag-cloud {
    margin: 2rem 0;
    padding: 1.5rem;
    border-radius: 12px;
    background-color: var(--vp-c-bg-soft);
  }

  .tag-cloud-title {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .tag-cloud-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .tag-item {
    display: inline-block;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    color: var(--vp-c-text-1);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .tag-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }

  .tag-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.3rem;
    font-size: 0.75em;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
  }

  @media (max-width: 768px) {
    .tag-cloud {
      padding: 1rem;
    }

    .tag-cloud-container {
      gap: 0.5rem;
    }

    .tag-item {
      padding: 0.3rem 0.6rem;
      font-size: 0.9rem;
    }
  }
</style>