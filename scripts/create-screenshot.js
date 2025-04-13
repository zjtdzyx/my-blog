import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建简单的博客截图示例
const createScreenshot = () => {
  // 使用简单的SVG作为示例截图
  const svgContent = `
<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f8f9fb"/>
  
  <!-- 顶部导航栏 -->
  <rect x="0" y="0" width="800" height="64" fill="#ffffff"/>
  <rect x="0" y="63" width="800" height="1" fill="#eaecef"/>
  
  <!-- Logo和导航链接 -->
  <text x="30" y="40" font-family="Arial" font-size="22" font-weight="bold" fill="#3c8cff">ZYX的博客</text>
  
  <rect x="500" y="24" width="60" height="16" rx="8" fill="#f0f0f0"/>
  <text x="530" y="37" font-family="Arial" font-size="13" fill="#444" text-anchor="middle">首页</text>
  
  <rect x="580" y="24" width="75" height="16" rx="8" fill="#f0f0f0"/>
  <text x="617" y="37" font-family="Arial" font-size="13" fill="#444" text-anchor="middle">技术博客</text>
  
  <rect x="670" y="24" width="75" height="16" rx="8" fill="#f0f0f0"/>
  <text x="707" y="37" font-family="Arial" font-size="13" fill="#444" text-anchor="middle">开源项目</text>
  
  <!-- 主角区域 Hero Section -->
  <rect x="0" y="64" width="800" height="160" fill="#f8f9fb"/>
  
  <!-- 名称和标语 -->
  <text x="50" y="120" font-family="Arial" font-size="42" font-weight="bold" fill="#3c8cff">ZYX</text>
  <text x="50" y="150" font-family="Arial" font-size="20" fill="#666">前端开发工程师</text>
  <text x="50" y="180" font-family="Arial" font-size="16" fill="#888">Midea实习生 | Atom组织领导者 | 全栈开发爱好者</text>
  
  <!-- 头像图片 -->
  <circle cx="650" cy="140" r="60" fill="#3c8cff" opacity="0.1"/>
  <circle cx="650" cy="140" r="54" fill="#ffffff" stroke="#3c8cff" stroke-width="2"/>
  <text x="650" y="154" font-family="Arial" font-size="30" font-weight="bold" text-anchor="middle" fill="#3c8cff">ZYX</text>
  
  <!-- 按钮 -->
  <rect x="50" y="200" width="100" height="32" rx="16" fill="#3c8cff"/>
  <text x="100" y="222" font-family="Arial" font-size="14" fill="#ffffff" text-anchor="middle">关于我</text>
  
  <rect x="160" y="200" width="100" height="32" rx="16" fill="#f0f0f0"/>
  <text x="210" y="222" font-family="Arial" font-size="14" fill="#666" text-anchor="middle">技术博客</text>
  
  <!-- 特性卡片区域 -->
  <text x="50" y="275" font-family="Arial" font-size="24" font-weight="bold" fill="#444">特色内容</text>
  
  <!-- 卡片1 -->
  <rect x="50" y="290" width="220" height="130" rx="8" fill="#ffffff" stroke="#eaecef"/>
  <text x="70" y="320" font-family="Arial" font-size="16" fill="#333">🚀 前端开发</text>
  <text x="70" y="345" font-family="Arial" font-size="13" fill="#666">Vue、React、TailwindCSS等</text>
  
  <!-- 卡片2 -->
  <rect x="290" y="290" width="220" height="130" rx="8" fill="#ffffff" stroke="#eaecef"/>
  <text x="310" y="320" font-family="Arial" font-size="16" fill="#333">💡 Atom系列项目</text>
  <text x="310" y="345" font-family="Arial" font-size="13" fill="#666">视频分享和数据可视化平台</text>
  
  <!-- 卡片3 -->
  <rect x="530" y="290" width="220" height="130" rx="8" fill="#ffffff" stroke="#eaecef"/>
  <text x="550" y="320" font-family="Arial" font-size="16" fill="#333">🏢 Midea实习</text>
  <text x="550" y="345" font-family="Arial" font-size="13" fill="#666">分享美的集团的实习经历</text>
  
  <!-- 底部 -->
  <rect x="0" y="435" width="800" height="15" fill="#f0f0f0"/>
  <text x="400" y="446" font-family="Arial" font-size="10" fill="#888" text-anchor="middle">基于 VitePress 构建 | Copyright © 2023 ZYX</text>
</svg>
  `;

  // 确保目录存在
  const outputDir = path.join(__dirname, '../docs/public/screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 保存SVG文件
  fs.writeFileSync(path.join(outputDir, 'home.svg'), svgContent);
  console.log('已创建博客首页截图示例: docs/public/screenshots/home.svg');
};

createScreenshot(); 