# 贡献指南

感谢您对我的博客项目的关注！本文档提供了如何贡献内容和代码的指南。

## 项目结构

```
项目根目录
├── docs/                  # 文档和内容
│   ├── .vitepress/        # VitePress配置
│   │   ├── config.js      # 网站配置文件
│   │   └── theme/         # 自定义主题
│   │       ├── components/  # 组件目录
│   │       │   ├── blog/    # 博客相关组件
│   │       │   ├── common/  # 通用组件
│   │       │   ├── layout/  # 布局组件
│   │       │   ├── navigation/ # 导航组件
│   │       │   └── ui/      # UI组件
│   │       ├── plugins/     # 插件目录
│   │       └── styles/      # 样式目录
│   │           ├── base.css      # 基础样式
│   │           ├── critical.css  # 关键样式
│   │           ├── custom.css    # 自定义样式
│   │           └── variables.css # 样式变量
│   ├── public/            # 静态资源
│   │   ├── screenshots/   # 截图图片
│   │   ├── projects/      # 项目相关图片
│   │   └── icons/         # 图标资源
│   ├── posts/             # 博客文章
│   │   ├── javascript/    # JavaScript文章
│   │   ├── typescript/    # TypeScript文章
│   │   ├── vue/           # Vue相关文章
│   │   └── ...            # 其他分类
│   ├── projects/          # 项目展示页面
│   ├── about/             # 关于我页面
│   └── index.md           # 网站首页
├── scripts/               # 工具脚本
│   └── create-screenshot.js # 生成网站截图
└── .github/workflows/     # GitHub Actions工作流
    └── deploy.yml         # 自动部署配置
```

## 内容贡献

### 添加新博客文章

1. 在适当的目录下创建新的Markdown文件，例如：`docs/posts/javascript/new-article.md`
2. 使用以下frontmatter模板开始你的文章：

```md
---
title: 文章标题
date: YYYY-MM-DD
tags: [标签1, 标签2]
description: 文章简短描述
head:
  - - meta
    - name: keywords
      content: 关键词1,关键词2
  - - meta
    - property: og:title
      content: 文章标题
  - - meta
    - property: og:description
      content: 文章简短描述
---

# 文章标题

文章内容...
```

3. 提交Pull Request

### 添加新项目

1. 在`docs/projects/`目录下创建新的Markdown文件
2. 在`docs/public/projects/`目录下添加项目相关图片
3. 使用项目模板格式编写项目介绍

## 代码贡献

### 主题开发

主题文件位于`docs/.vitepress/theme/`目录下：

1. **组件**: 按功能分类放在对应的子目录中
   - `blog/`: 博客相关组件
   - `common/`: 通用组件
   - `layout/`: 布局组件
   - `navigation/`: 导航组件
   - `ui/`: UI组件

2. **样式**: 存放在`styles/`目录下
   - `variables.css`: 定义全局变量
   - `base.css`: 基础样式
   - `critical.css`: 关键渲染路径样式
   - `custom.css`: 自定义样式

3. **插件**: 存放在`plugins/`目录下

### 代码风格指南

- 遵循Vue 3组合式API风格
- 使用ESLint和Prettier保持代码风格一致
- 组件使用PascalCase命名
- CSS类名使用kebab-case命名
- 使用语义化HTML标签

## 优化路线图

请参考README.md中的"博客优化路线图"部分，了解计划中的功能和已完成的功能。

## 提交流程

1. Fork仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交Pull Request

## 提交消息规范

请使用约定式提交格式：

- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档更改
- `style`: 不影响代码含义的更改（空白、格式等）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动

例如：`feat: 添加标签云组件`

感谢您的贡献！ 