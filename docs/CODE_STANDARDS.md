# 代码规范

本文档定义了博客项目的代码规范和最佳实践。

## 组件开发规范

### 1. 命名规范

- **组件文件名**：使用PascalCase，例如：`BlogHeader.vue`
- **CSS类名**：使用kebab-case，例如：`blog-header`
- **方法/函数**：使用camelCase，例如：`fetchArticles()`
- **Props**：使用camelCase，例如：`articleId`
- **事件名**：使用kebab-case，例如：`@article-selected`

### 2. 组件结构

每个Vue组件应按以下顺序组织：

```vue
<script setup>
// 导入部分
import { ref, computed, onMounted } from 'vue'
import MyComponent from './MyComponent.vue'

// Props定义
const props = defineProps({
  propName: {
    type: String,
    required: true
  }
})

// 事件定义
const emit = defineEmits(['event-name'])

// 状态/响应式变量
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
  emit('event-name', count.value)
}

// 生命周期钩子
onMounted(() => {
  // 初始化逻辑
})
</script>

<template>
  <div class="component-name">
    <!-- 组件模板 -->
  </div>
</template>

<style scoped>
/* 组件样式 */
.component-name {
  /* 样式 */
}
</style>
```

### 3. 代码格式化

- 使用2个空格缩进
- 使用单引号而非双引号
- 所有语句后使用分号
- 避免过长的行（最大长度：100字符）
- 组件选项顺序一致

## CSS/SCSS规范

### 1. CSS变量

使用定义在`/styles/variables.css`中的CSS变量，保持样式一致性：

```css
/* 推荐 */
.my-element {
  color: var(--vp-c-brand);
}

/* 不推荐 */
.my-element {
  color: #3c8cff;
}
```

### 2. 组织结构

CSS应组织为：

1. 变量定义
2. 布局规则
3. 组件规则
4. 修饰规则
5. 响应式规则

```css
/* 1. 布局规则 */
.blog-card {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

/* 2. 组件规则 */
.blog-card-image {
  border-radius: 8px;
}

/* 3. 修饰规则 */
.blog-card.featured {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 4. 响应式规则 */
@media (max-width: 768px) {
  .blog-card {
    grid-template-columns: 1fr;
  }
}
```

### 3. 选择器

- 避免过深的选择器嵌套（最多3层）
- 优先使用类选择器而非标签选择器
- 使用BEM方法论命名CSS类

## JavaScript规范

### 1. 现代JavaScript特性

- 使用ES6+语法
- 优先使用箭头函数
- 使用async/await而非Promise链
- 使用解构赋值
- 使用模板字符串

### 2. 函数组织

- 单一职责原则：每个函数只做一件事
- 参数不应超过3个，使用对象传递多个参数
- 函数应小而专注，保持在30行以内

```js
// 推荐
const fetchArticles = async ({ tags, limit, page }) => {
  // 实现逻辑
}

// 不推荐
const fetchArticles = async (tags, limit, page, sortBy, filterFn, isPublished) => {
  // 复杂实现逻辑
}
```

## 性能优化实践

### 1. 组件优化

- 使用`v-once`渲染静态内容
- 大型列表使用`v-for`时添加`key`并考虑虚拟滚动
- 对于大型组件使用异步组件和懒加载
- 适当使用`v-show`和`v-if`

### 2. 资源优化

- 图片使用WebP或AVIF格式
- 应用懒加载策略
- 优化关键渲染路径
- 使用HTTP/2推送关键资源

## 可访问性标准

- 所有交互元素必须可通过键盘访问
- 图片必须包含alt文本
- 使用语义化HTML标签
- 保持足够的颜色对比度
- 添加ARIA标签增强屏幕阅读器体验

```html
<!-- 推荐 -->
<button 
  aria-label="返回顶部" 
  class="back-to-top"
>
  <svg><!-- 图标 --></svg>
</button>

<!-- 不推荐 -->
<div class="back-to-top" onclick="scrollToTop()">
  <svg><!-- 图标 --></svg>
</div>
```

## 文档规范

- 复杂组件应有相应文档
- 公共API和方法应有JSDoc注释
- README应包含安装和使用说明
- 更新CHANGELOG记录变更

## 提交和版本控制

- 遵循语义化版本控制（Semantic Versioning）
- 使用约定式提交信息
- 每个提交应专注于单一更改
- 避免在单个提交中混合不相关的修改 