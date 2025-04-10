---
title: 文章标题
description: 文章描述，用于SEO和分享卡片
date: YYYY-MM-DD
tags:
  - 标签1
  - 标签2
  - 标签3
head:
  - - meta
    - name: keywords
      content: 关键词1,关键词2,关键词3
  - - meta
    - name: author
      content: ZYX
---

# 文章标题

<div class="article-meta">
  <div class="meta-item">
    <span class="meta-icon">📅</span>
    <span class="meta-text">发布于: {{ $frontmatter.date }}</span>
  </div>
  <div class="meta-item">
    <span class="meta-icon">🏷️</span>
    <span class="meta-text">
      标签: 
      <span 
        v-for="tag in $frontmatter.tags" 
        :key="tag" 
        class="article-tag"
      >{{ tag }}</span>
    </span>
  </div>
</div>

## 概述

在这里介绍文章的主要内容和目的。这部分应该简洁明了，让读者快速了解文章要讲什么。

## 主要内容

这里是文章的主体部分，可以包含多个小节。

### 小节一

内容...

### 小节二

内容...

## 代码示例

```js
// 这里是代码示例
function example() {
  console.log('Hello, World!');
}

example();
```

## 图片展示

<!-- 
实际使用时请替换为真实图片路径
![图片描述](/path/to/image.jpg)
-->

## 总结

总结文章的主要观点和结论。

<ArticleFooter />

<style scoped>
.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-icon {
  margin-right: 0.5rem;
}

.article-tag {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  margin: 0 0.25rem;
  border-radius: 4px;
  font-size: 0.85rem;
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
}
</style> 