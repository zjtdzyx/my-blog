---
title: 文章标签
description: 按标签浏览博客文章
sidebar: false
aside: false
---

# 文章标签

<ClientOnly>
  <TagCloud />
  
  <TagPosts />
</ClientOnly>

<script setup>
import { onMounted } from 'vue'

// 当页面加载并且URL包含锚点时，滚动到对应的锚点位置
onMounted(() => {
  if (location.hash) {
    setTimeout(() => {
      const id = location.hash.slice(1)
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }
})
</script>

<style>
.VPDoc {
  padding-bottom: 4rem;
}
</style> 