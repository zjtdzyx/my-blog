# 我的个人博客

这是一个使用VitePress构建的个人博客站点。

## 功能特点

- 响应式设计
- 基于Markdown的内容编写
- 基于Vue 3和Vite的快速开发体验
- 使用Bun作为包管理器和运行时环境
- 自定义主题和样式

## 安装

```bash
# 克隆项目
git clone https://github.com/zjtdzyx/my-vitepress-blog.git
cd my-vitepress-blog

# 安装依赖 (使用Bun)
bun install
```

## 开发

```bash
# 启动开发服务器
bun run docs:dev
```

然后在浏览器打开 http://localhost:5173

## 构建

```bash
# 构建静态文件
bun run docs:build
```

构建后的文件将会在 `docs/.vitepress/dist` 目录下

## 预览构建后的站点

```bash
bun run docs:preview
```

## 部署

构建完成后，可以将 `docs/.vitepress/dist` 目录中的文件部署到任何静态站点服务器，如GitHub Pages, Netlify, Vercel等。 