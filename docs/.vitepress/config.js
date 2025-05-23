import { defineConfig } from 'vitepress'
import { SearchPlugin } from 'vitepress-plugin-search'
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { generateRSSFeed } from './rss'

const searchOptions = {
  encode: false,
  tokenize: 'full',
  previewLength: 62,
  buttonLabel: '搜索',
  placeholder: '搜索文档',
  allow: [],
  ignore: [],
}

// SEO相关元数据
const siteName = "ZYX的博客";
const siteDescription = "前端开发工程师的个人博客和技术分享站点";
const siteDomain = "https://zjtxzyx.xyz";
const siteAuthor = "ZYX";
const themeColor = "#3c8cff";

// 生成网站地图
const links = []
const sitemap = new SitemapStream({ hostname: siteDomain })
const writeStream = createWriteStream(resolve(process.cwd(), 'docs/public/sitemap.xml'))
sitemap.pipe(writeStream)

export default defineConfig({
  title: siteName,
  description: siteDescription,
  lang: 'zh-CN',
  
  // 自定义域名配置
  base: '/', // 自定义域名使用根路径
  
  // 页面设置
  cleanUrls: true,
  lastUpdated: true,
  
  // 国际化配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/'
    },
    'en-US': {
      label: 'English',
      lang: 'en-US',
      link: '/en-US/'
    }
  },
  
  // SEO相关设置
  head: [
    // 字体预加载
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap', rel: 'stylesheet' }],
    
    // RSS feed相关
    ['link', { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml', title: `${siteName} RSS Feed` }],
    ['link', { rel: 'alternate', type: 'application/atom+xml', href: '/atom.xml', title: `${siteName} Atom Feed` }],
    ['link', { rel: 'alternate', type: 'application/json', href: '/feed.json', title: `${siteName} JSON Feed` }],
    
    // Favicon和应用图标
    ['link', { rel: 'icon', type: 'image/png', href: '/images/site/logo.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/site/logo.png' }],
    ['link', { rel: 'mask-icon', href: '/images/site/logo.png', color: themeColor }],
    
    // SEO元标签
    ['meta', { name: 'theme-color', content: themeColor }],
    ['meta', { name: 'author', content: siteAuthor }],
    ['meta', { name: 'keywords', content: '前端开发,JavaScript,Vue,React,TypeScript,CSS,前端工程化,性能优化' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: siteName }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['meta', { property: 'og:url', content: siteDomain }],
    ['meta', { property: 'og:image', content: `${siteDomain}/images/site/logo.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: siteName }],
    ['meta', { name: 'twitter:description', content: siteDescription }],
    ['meta', { name: 'twitter:image', content: `${siteDomain}/images/site/logo.png` }],
    ['link', { rel: 'sitemap', href: '/sitemap.xml' }],
    
    // 百度统计代码
    ['script', {}, `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?d86c1c2bb3ae3978a2eb2473b32d0f81";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `],
  ],
  
  // 网站生成完成后的钩子函数
  buildEnd: async ({ outDir }) => {
    // 关闭网站地图流
    sitemap.end()
    console.log('网站地图已生成在 ' + resolve(process.cwd(), 'docs/public/sitemap.xml'))
    
    // 生成RSS feed
    generateRSSFeed()
  },
  
  // 转换页面URL为网站地图条目
  transformPageData: (pageData) => {
    const { relativePath, frontmatter, lastUpdated } = pageData
    
    // 排除特定页面
    if (frontmatter.sitemap === false) return

    // 添加到网站地图链接
    const url = relativePath.replace(/\.md$/, '')
    if (url !== 'index') {
      links.push({
        url: url.startsWith('/') ? url : `/${url}`,
        lastmod: lastUpdated,
        // 可选的自定义优先级
        priority: frontmatter.sitemapPriority || 0.7
      })
    } else {
      // 首页使用更高的优先级
      links.push({
        url: '/',
        lastmod: lastUpdated,
        priority: 1.0
      })
    }
    
    // 将链接添加到网站地图
    if (links.length > 0) {
      links.forEach(link => {
        sitemap.write(link)
      })
      // 清空链接数组，避免重复添加
      links.length = 0
    }
  },
  
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
    },
    ssr: {
      noExternal: ['element-plus'],
    },
  },
  
  // 内容宽度调整
  themeConfig: {
    logo: '/images/site/logo.png',
    
    // 网站宽度调整
    siteWidth: '100%',
    editLink: false,
    
    nav: [
      { 
        text: '首页', 
        link: '/',
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
      },
      { 
        text: '博客', 
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>',
        items: [
          { text: '基础知识', link: '/posts/base/' },
          { text: '前端工程化', link: '/posts/engineering/' },
          { text: '性能优化', link: '/posts/performance/' },
          { text: '学习笔记', link: '/posts/studying/' },
          { text: '实习经验', link: '/posts/experience/' },
        ]
      },
      { 
        text: '开源项目', 
        link: '/projects/',
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"></path><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path><path d="M16 19h6"></path><path d="M19 16v6"></path></svg>'
      },
      { 
        text: '我的朋友', 
        link: '/friends/',
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><path d="M7 7h.01"></path></svg>'
      },
      { 
        text: '关于我', 
        link: '/about/',
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>'
      },
      {
        text: 'RSS',
        link: '/rss.xml',
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>'
      }
    ],
    
    sidebar: {
      '/posts/base/': [
        {
          text: '前端基础知识',
          items: [
            { text: 'JavaScript', link: '/posts/base/javascript/' },
            { text: 'TypeScript', link: '/posts/base/typescript/' },
            { text: 'Vue', link: '/posts/base/vue/' },
            { text: 'React', link: '/posts/base/react/' },
          ]
        }
      ],
      '/posts/engineering/': [
        {
          text: '前端工程化',
          items: [
            { text: '前端工程化概述', link: '/posts/engineering/overview' },
            { text: 'Monorepo的应用', link: '/posts/engineering/monorepo' },
            { text: 'API设计风格梳理', link: '/posts/engineering/api_style' }, 
            { text: 'package.json简要说明', link: '/posts/engineering/package_json' },
          ]
        }
      ],
      '/posts/performance/': [
        {
          text: '性能优化',
          items: [
            { text: '前端性能优化概述', link: '/posts/performance/overview' },
            { text: '关键渲染路径', link: '/posts/performance/critical-rendering-path' },
            { text: '懒加载技术', link: '/posts/performance/lazy-loading' },
          ]
        }
      ],
      '/posts/studying/': [
        {
          text: '学习笔记',
          items: [
            { text: '低代码平台研究报告', link: '/posts/studying/低代码平台 研究报告' },
            { text: 'n8n研究报告', link: '/posts/studying/n8n 研究报告' },
          ]
        }
      ],
      '/posts/experience/': [
        {
          text: '实习经验',
          items: [
            { text: '实习经历', link: '/posts/experience/experience' },
            { text: 'i18n国际化', link: '/posts/experience/i18n国际化' },
          ]
        }
      ],
      '/projects/': [
        {
          text: '开源项目',
          items: [
            { text: '项目概览', link: '/projects/' },
            { text: 'Atom-Video', link: '/projects/video' },
            {text: 'Atom-Nexus', link: '/projects/nexus' },
            { text: 'Atom-Stats', link: '/projects/stats' },
            { text: '项目总结', link: '/projects/summary' },
          ]
        }
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zjtdzyx' },
    ],
    
    footer: {
      message: 'One Day We Will All Be Famous!',
      copyright: `Copyright © ${new Date().getFullYear()} ZYX`
    },
    
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    outline: {
      label: '页面导航'
    },
    
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    langMenuLabel: '语言',

    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    }
  },

  // 插件配置
  plugins: [
    SearchPlugin(searchOptions)
  ],

  // 网站的额外选项
  appearance: true, // 暗黑模式
  ignoreDeadLinks: true, // 忽略死链接
  markdown: {
    theme: 'material-theme-palenight', // 代码高亮主题
    lineNumbers: true // 显示行号
  }
}) 