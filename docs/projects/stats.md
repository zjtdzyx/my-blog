# Atom-Stats

![Atom-Stats Logo](./public/stats-icon.svg)

Atom-Stats 是一个专业的代码统计分析工具，作为 Atom 系列产品的重要组成部分，致力于帮助开发者和团队更好地理解和管理代码库。

## ✨ 特性

- 📊 全面的代码统计
  - [x] 代码行数统计
  - [x] 文件类型分析
  - [x] 代码复杂度分析
  - [ ] 代码重复度检测
  - [ ] 依赖关系分析

- 📈 数据可视化
  - [x] 统计图表展示
  - [x] 趋势分析
  - [ ] 实时数据更新
  - [ ] 自定义报表

- 🔍 深度分析
  - [ ] 代码质量评估
  - [ ] 性能瓶颈检测
  - [ ] 安全漏洞扫描
  - [ ] 最佳实践检查

- 🤝 团队协作
  - [ ] 团队数据dashboard
  - [ ] 代码审查集成
  - [ ] 自动化报告
  - [ ] 团队效能分析

## 📅 开发路线图

### 第一阶段 (2025 Q2)
- [x] 项目初始化与基础架构搭建
- [x] 基础代码统计功能
- [x] 数据可视化基础实现
- [ ] 文件分析系统开发 (进行中)
- [ ] 基础报表功能 (进行中)

### 第二阶段 (2025 Q3)
- [ ] 深度代码分析功能
- [ ] Git 集成增强
- [ ] 团队协作功能
- [ ] 自动化报告系统

### 第三阶段 (2025 Q4)
- [ ] VS Code 插件开发
- [ ] CI/CD 集成
- [ ] API 接口支持
- [ ] 性能优化

### 第四阶段 (2026 Q1)
- [ ] AI 代码分析
- [ ] 多语言支持扩展
- [ ] 企业级功能
- [ ] 生态系统建设

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 8
- Git >= 2.34

### 安装

```bash
# 克隆项目
git clone https://github.com/atom-dev/atom-stats.git

# 安装依赖
cd atom-stats
pnpm install

# 启动开发服务器
pnpm dev
```

### 开发命令
```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm preview      # 预览生产构建
pnpm lint         # 代码检查
pnpm format       # 代码格式化
```

## 📦 项目结构

```
src/
├── components/     # 可复用组件
├── pages/         # 页面组件
├── hooks/         # 自定义 Hooks
├── stores/        # 状态管理
├── services/      # API 服务
├── utils/         # 工具函数
└── types/         # TypeScript 类型定义
```

## 🔧 技术栈

- React 18
- TypeScript 5
- Vite 5
- TailwindCSS 3
- Recharts 2
- Vitest
- ESLint
- Prettier

## 🤝 参与贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 📄 更新日志

最新更新请查看 [CHANGELOG.md](./CHANGELOG.md)

## 📝 开发文档

详细文档请查看 [/docs](./docs) 目录：

- [配置指南](./docs/configuration.md)
- [开发指南](./docs/development.md)
- [API文档](./docs/api.md)
- [部署指南](./docs/deployment.md)

## 📄 许可证

本项目采用 [MIT](./LICENSE) 许可证。
