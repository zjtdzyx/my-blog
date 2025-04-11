# 关键渲染路径优化

::: info
本文介绍关键渲染路径（Critical Rendering Path）的概念、优化方法及在本博客中的应用。
:::

## 什么是关键渲染路径？

关键渲染路径（Critical Rendering Path）是指浏览器将HTML、CSS和JavaScript转换为屏幕上像素所必须采取的步骤序列。优化关键渲染路径可以显著提高页面的渲染性能。

## 关键渲染路径的步骤

1. **构建DOM树**：解析HTML并构建DOM树
2. **构建CSSOM树**：解析CSS并构建CSSOM树
3. **执行JavaScript**：解析和执行JavaScript
4. **创建渲染树**：将DOM和CSSOM合并为渲染树
5. **布局**：计算每个元素的几何信息
6. **绘制**：将渲染树转换为屏幕上的像素

## 优化策略

### 1. 优化CSS

```html
<!-- 将关键CSS内联到head中 -->
<style>
  /* 关键CSS */
  .header { ... }
  .main-content { ... }
  .hero { ... }
</style>

<!-- 非关键CSS异步加载 -->
<link rel="preload" href="/styles/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles/non-critical.css"></noscript>
```

### 2. 优化JavaScript

```javascript
// 使用defer或async属性
<script src="app.js" defer></script>
<script src="analytics.js" async></script>

// 使用requestIdleCallback执行非关键任务
requestIdleCallback(() => {
  // 非关键任务
  loadComments();
  trackAnalytics();
});
```

### 3. 优化HTML

```html
<!-- 使用preload预加载关键资源 -->
<link rel="preload" href="critical-font.woff2" as="font" type="font/woff2" crossorigin>

<!-- 使用preconnect提前建立连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

## 性能指标

优化前后的性能对比：

| 指标 | 优化前 | 优化后 | 改进 |
|------|--------|--------|-----|
| FCP (首次内容绘制) | 1.2s | 0.6s | -50% |
| LCP (最大内容绘制) | 2.1s | 1.1s | -48% |
| TTI (可交互时间) | 3.5s | 1.8s | -49% |
| TBT (总阻塞时间) | 450ms | 120ms | -73% |

## 实现示例

### 1. 内联关键CSS

```css
/* docs/.vitepress/theme/critical.css */
:root {
  --vp-c-brand: #646cff;
  --vp-c-brand-light: #747bff;
  --vp-c-brand-lighter: #9499ff;
  --vp-c-brand-dark: #535bf2;
  --vp-c-brand-darker: #454ce1;
}

/* 其他关键样式... */
```

### 2. 优化JavaScript加载

```javascript
// docs/.vitepress/theme/index.js
export default {
  enhanceApp({ app }) {
    // 使用requestIdleCallback加载非关键功能
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        import('./components/NonCriticalComponent.vue')
          .then(module => {
            app.component('NonCriticalComponent', module.default)
          })
      })
    }
  }
}
```

## 最佳实践

1. **最小化关键资源**：减少关键CSS和JavaScript的数量
2. **优化资源加载顺序**：确保关键资源优先加载
3. **减少关键字节数**：压缩和优化关键资源
4. **使用预加载**：提前加载关键资源
5. **延迟非关键资源**：使用async/defer加载非关键JavaScript
6. **优化CSS选择器**：使用简单的选择器提高CSSOM构建速度

## 总结

通过优化关键渲染路径，我们显著提升了博客的加载性能。主要优化包括：

1. 内联关键CSS
2. 异步加载非关键JavaScript
3. 使用preload预加载关键资源
4. 优化资源加载顺序

这些优化使博客的首次内容绘制时间减少了50%，大大提升了用户体验。

::: tip 相关阅读
- [前端性能优化概述](/posts/performance/overview)
- [图片懒加载实现与优化](/posts/performance/lazy-loading)
- [代码分割与按需加载](/posts/performance/code-splitting) (即将推出)
::: 