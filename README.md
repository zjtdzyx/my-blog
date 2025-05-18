# ZYX的个人博客

一个基于VitePress构建的现代化个人博客，专注于技术分享和项目展示。博客采用响应式设计，支持亮色/暗色主题切换。

## 🚀 特点

* **现代化设计** - 简洁美观的UI设计，响应式布局支持各种设备
* **高性能** - 基于VitePress构建，页面加载速度快
* **丰富功能** - 博客分类、项目展示、个人简介和全文搜索
* **完善的SEO** - 针对搜索引擎优化的元标签和结构，包括sitemap生成
* **主题切换** - 支持亮色/暗色主题切换

## 📋 博客内容

* **基础知识** - JavaScript、TypeScript、Vue、React等前端技术文章
* **前端工程化** - 工程化实践和经验分享
* **性能优化** - 前端性能优化技巧和方法
* **学习笔记** - 技术研究和学习心得
* **实习经验** - 实习过程中的感悟与成长
* **开源项目** - 展示个人开发的项目

## 📁 项目结构

```
项目根目录
├── docs/                  # 文档和内容
│   ├── .vitepress/        # VitePress配置
│   │   ├── config.js      # 网站配置文件
│   │   ├── rss.js         # RSS生成配置
│   │   └── theme/         # 自定义主题
│   ├── public/            # 静态资源
│   │   ├── images/        # 图片资源
│   │   │   ├── site/      # 网站相关图片
│   │   │   ├── friends/   # 友链头像
│   │   │   └── common/    # 通用图片
│   │   ├── projects/      # 项目相关图片
│   │   └── screenshots/   # 截图图片
│   ├── posts/             # 博客文章
│   │   ├── base/          # 基础知识
│   │   │   ├── javascript/ # JavaScript文章
│   │   │   ├── typescript/ # TypeScript文章
│   │   │   ├── vue/       # Vue相关文章
│   │   │   └── react/     # React相关文章
│   │   ├── engineering/   # 前端工程化
│   │   ├── performance/   # 性能优化
│   │   ├── studying/      # 学习笔记
│   │   └── experience/    # 实习经验
│   ├── projects/          # 项目展示页面
│   ├── friends/           # 友情链接
│   ├── about/             # 关于我页面
│   └── index.md           # 网站首页
└── package.json           # 项目依赖
```

## 💻 本地开发

### 环境要求

* Node.js 16+
* bun

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/zjtdzyx/my-blog.git
cd my-blog
```

2. 安装依赖

```bash
bun install
```

3. 启动开发服务器

```bash
bun run docs:dev
```

4. 构建生产版本

```bash
bun run docs:build
```

5. 预览构建版本

```bash
bun run docs:preview
```

## 🚀 部署

此博客已配置自动部署到自定义域名 `zjtxzyx.xyz`。

## 📜 许可证

MIT

## 👤 作者

* ZYX
* GitHub: [@zjtdzyx](https://github.com/zjtdzyx) 
 