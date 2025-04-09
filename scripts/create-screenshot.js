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
  <rect width="100%" height="100%" fill="#f5f5f5"/>
  <rect x="0" y="0" width="800" height="60" fill="#333"/>
  <text x="30" y="40" font-family="Arial" font-size="24" fill="white">我的博客</text>
  
  <!-- 导航栏 -->
  <rect x="650" y="20" width="120" height="30" rx="5" fill="#555"/>
  <text x="670" y="40" font-family="Arial" font-size="16" fill="white">菜单</text>
  
  <!-- 内容区域 -->
  <rect x="50" y="100" width="700" height="80" rx="5" fill="white" stroke="#ddd"/>
  <text x="70" y="140" font-family="Arial" font-size="24" fill="#333">欢迎来到我的博客!</text>
  <text x="70" y="170" font-family="Arial" font-size="16" fill="#666">基于VitePress构建的现代静态博客</text>
  
  <!-- 文章卡片 -->
  <rect x="50" y="220" width="220" height="180" rx="5" fill="white" stroke="#ddd"/>
  <text x="70" y="260" font-family="Arial" font-size="18" fill="#333">文章标题1</text>
  <text x="70" y="290" font-family="Arial" font-size="14" fill="#666">发布于2023-5-10</text>
  
  <rect x="290" y="220" width="220" height="180" rx="5" fill="white" stroke="#ddd"/>
  <text x="310" y="260" font-family="Arial" font-size="18" fill="#333">文章标题2</text>
  <text x="310" y="290" font-family="Arial" font-size="14" fill="#666">发布于2023-5-15</text>
  
  <rect x="530" y="220" width="220" height="180" rx="5" fill="white" stroke="#ddd"/>
  <text x="550" y="260" font-family="Arial" font-size="18" fill="#333">文章标题3</text>
  <text x="550" y="290" font-family="Arial" font-size="14" fill="#666">发布于2023-5-20</text>
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