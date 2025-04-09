# ZYX的博客

一个基于VitePress构建的现代化个人博客，专注于技术分享和项目展示。

![博客首页](./docs/public/screenshots/home.svg)

## 🚀 特点

- **现代化设计** - 简洁美观的UI设计，响应式布局支持各种设备
- **高性能** - 基于VitePress构建，页面加载速度快
- **丰富功能** - 博客分类、项目展示、个人简介和搜索功能
- **完善的SEO** - 针对搜索引擎优化的元标签和结构
- **暗黑模式** - 支持亮色/暗色主题切换
- **内容丰富** - 技术博客、开源项目、个人经历分享

## 📋 博客内容

- **技术博客** - JavaScript、TypeScript、Vue、React等前端技术文章
- **开源项目** - 展示个人开发的项目和贡献的开源作品
- **Midea实习** - 分享在美的集团的实习经历和技术成长
- **个人介绍** - 关于我的个人资料和联系方式

## 🔧 技术栈

- **VitePress** - 基于Vite的静态站点生成器
- **Vue 3** - 渐进式JavaScript框架
- **Element Plus** - Vue 3的组件库
- **SCSS/CSS** - 样式和动画
- **Markdown** - 内容编写

## 💻 本地开发

### 环境要求

- Node.js 16+
- Bun (推荐) 或 npm

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/zjtdzyx/my-vitepress-blog.git
cd my-vitepress-blog
```

2. 安装依赖

```bash
# 使用Bun（推荐）
bun install

# 或使用npm
npm install
```

3. 启动开发服务器

```bash
# 使用Bun
bun run docs:dev

# 或使用npm
npm run docs:dev
```

4. 构建生产版本

```bash
# 使用Bun
bun run docs:build

# 或使用npm
npm run docs:build
```

## 📱 响应式设计

博客采用响应式设计，适配以下设备屏幕：

- 手机(<768px)：单列布局
- 平板(768px-1200px)：双列布局
- 桌面(>1200px)：三列布局

## 🎨 自定义主题

项目使用了VitePress的主题自定义功能，增加了：

- 自定义首页布局
- 博客文章目录组件
- 项目卡片展示组件
- 个人资料卡片
- 定制的导航和页脚

## 📚 内容组织

```
docs/
├── index.md            # 首页
├── about/              # 关于我
├── posts/              # 博客文章
│   ├── javascript/     # JavaScript相关文章
│   ├── typescript/     # TypeScript相关文章
│   └── ...
├── projects/           # 项目展示
├── public/             # 静态资源
└── .vitepress/         # VitePress配置
    ├── config.js       # 网站配置
    └── theme/          # 自定义主题
```

## 🚀 部署

此博客可以部署在：

- GitHub Pages（已配置自动部署）
- Vercel
- Netlify
- 任何支持静态网站的托管服务

### GitHub Pages自动部署

本项目已配置GitHub Actions工作流，当代码推送到`main`分支时，将自动构建并部署到GitHub Pages。

1. 确保已在仓库设置中启用GitHub Pages
2. 选择"GitHub Actions"作为Pages的构建和部署源
3. 推送代码到`main`分支即可触发自动部署

也可以在Actions选项卡中手动触发部署工作流。

## 📜 许可证

MIT

## 👤 作者

- ZYX
- GitHub: [@zjtdzyx](https://github.com/zjtdzyx) 