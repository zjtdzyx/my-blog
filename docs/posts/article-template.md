---
title: 文章标题
date: YYYY-MM-DD
tags: [标签1, 标签2]
author: ZYX
description: 文章简短描述（150-160字符）
# 用于SEO的元数据
head:
  - - meta
    - name: keywords
      content: 关键词1,关键词2,关键词3,关键词4
  - - meta
    - property: og:title
      content: 文章标题 | ZYX的博客
  - - meta
    - property: og:description
      content: 文章简短描述（150-160字符）
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:image
      content: https://zjtxzyx.xyz/article-preview.jpg
  - - meta
    - property: article:published_time
      content: YYYY-MM-DDT00:00:00.000Z
  - - meta
    - property: article:author
      content: ZYX
# 自定义布局（可选）
layout: blog-article
# 侧边栏设置（可选）
sidebar: auto
# 阅读时间（如不设置会自动计算）
readingTime: 10分钟
# 相关文章推荐（可选）
related:
  - /posts/path/to/related-article-1
  - /posts/path/to/related-article-2
# 封面图（可选）
cover: /path/to/cover-image.jpg
# 是否在网站地图中包含（默认true）
sitemap: true
# 网站地图优先级（可选，默认0.7）
sitemapPriority: 0.8
---

# 文章标题

<div class="article-meta">
  <span class="article-date">{{ $frontmatter.date }}</span>
  <span class="article-reading-time">阅读时间：{{ $frontmatter.readingTime }}</span>
  <span class="article-tags">
    <span v-for="tag in $frontmatter.tags" :key="tag" class="article-tag">{{ tag }}</span>
  </span>
</div>

## 文章概述

在这部分简要介绍文章的主要内容和目的。这段文字应该能够吸引读者继续阅读。

## 正文第一部分

正文内容...

### 子标题

更多内容...

```javascript
// 代码示例
function example() {
  console.log('这是一个代码示例');
}
```

## 正文第二部分

更多内容...

> 引用内容或重要提示

## 总结

总结文章的主要观点和结论。

---

<ArticleFooter />

<div class="article-navigation">
  <RelatedPosts />
</div>

<GiscusComments /> 