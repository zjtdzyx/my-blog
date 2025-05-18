import { Feed } from 'feed';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { load } from 'js-yaml';
import { marked } from 'marked';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import matter from 'gray-matter';

// 博客配置
const siteName = "ZYX的博客";
const siteDescription = "前端开发工程师的个人博客和技术分享站点";
const siteDomain = "https://zjtxzyx.xyz";
const siteAuthor = "ZYX";

/**
 * 生成RSS Feed
 */
export function generateRSSFeed() {
  // 创建feed实例
  const feed = new Feed({
    title: siteName,
    description: siteDescription,
    id: siteDomain,
    link: siteDomain,
    language: 'zh-CN',
    image: `${siteDomain}/images/site/logo.png`,
    favicon: `${siteDomain}/favicon.ico`,
    copyright: `Copyright © ${new Date().getFullYear()} ${siteAuthor}`,
    feedLinks: {
      rss: `${siteDomain}/rss.xml`,
      json: `${siteDomain}/feed.json`,
      atom: `${siteDomain}/atom.xml`
    },
    author: {
      name: siteAuthor,
      email: 'your-email@example.com',
      link: siteDomain
    }
  });

  // 读取博客文章目录
  const postFolders = [
    'docs/posts/base/javascript',
    'docs/posts/base/typescript',
    'docs/posts/base/vue',
    'docs/posts/base/react',
    'docs/posts/engineering',
    'docs/posts/performance',
    'docs/posts/experience',
    'docs/posts/studying'
  ];
  
  // 存储所有文章
  const allPosts = [];

  // 收集所有文章
  postFolders.forEach(folder => {
    if (existsSync(folder)) {
      try {
        const files = readdirSync(folder);
        
        files.forEach(file => {
          if (file.endsWith('.md')) {
            const filePath = join(folder, file);
            try {
              const fileContent = readFileSync(filePath, 'utf8');
              const { data, content } = matter(fileContent);
              
              // 检查是否有必要的元数据
              if (data.title && data.date) {
                allPosts.push({
                  ...data,
                  content,
                  path: filePath.replace('docs', '').replace(/\.md$/, ''),
                  fullPath: filePath
                });
              }
            } catch (err) {
              console.error(`处理文件 ${filePath} 时出错:`, err);
            }
          }
        });
      } catch (err) {
        console.error(`读取文件夹 ${folder} 时出错:`, err);
      }
    }
  });

  // 按日期排序（最新的在前）
  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 将文章添加到feed
  allPosts.forEach(post => {
    const url = `${siteDomain}${post.path}`;
    
    // 转换Markdown为HTML
    const htmlContent = marked(post.content);
    
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description || '',
      content: htmlContent,
      author: [
        {
          name: post.author || siteAuthor,
          link: siteDomain
        }
      ],
      date: new Date(post.date),
      image: post.cover ? `${siteDomain}${post.cover}` : undefined
    });
    
    // 如果有标签，添加为分类
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        feed.addCategory(tag);
      });
    }
  });

  // 确保public目录存在
  const publicDir = resolve(process.cwd(), 'docs/public');
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true });
  }

  // 生成RSS文件
  writeFileSync(resolve(publicDir, 'rss.xml'), feed.rss2());
  writeFileSync(resolve(publicDir, 'atom.xml'), feed.atom1());
  writeFileSync(resolve(publicDir, 'feed.json'), feed.json1());

  console.log('RSS feed 已生成');
} 