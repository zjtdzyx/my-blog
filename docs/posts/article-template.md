---
title: 文章标题
description: 文章简短描述，用于SEO和社交媒体分享卡片
date: 2023-05-01
author: ZYX
tags:
  - JavaScript
  - Vue
  - 前端开发
# 使用自定义布局组件
layout: doc
---

<BlogArticleLayout>

# {{ $frontmatter.title }}

<!-- 这里是文章正文内容 -->
在这里撰写您的文章内容。Markdown格式支持各种格式化选项：

## 二级标题

### 三级标题

- 列表项1
- 列表项2
- 列表项3

```js
// 代码示例
function example() {
  console.log('这是一个代码示例');
}
```

## 另一个章节

文章的更多内容...

<ArticleFooter />

<!-- 相关文章推荐 -->
<RelatedPosts />

<!-- 添加评论区 -->
<GiscusComments />

</BlogArticleLayout>

<script setup>
// 这里可以添加特定于文章的自定义逻辑
</script>

<style>
/* 这里可以添加特定于文章的样式 */
</style> 