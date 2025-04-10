import { defineConfig } from 'vitepress'
import { SearchPlugin } from 'vitepress-plugin-search'
import { SitemapStream } from 'sitemap'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'

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
  
  // SEO相关设置
  head: [
    // 字体预加载
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap', rel: 'stylesheet' }],
    
    // Favicon和应用图标
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo.png' }],
    ['link', { rel: 'mask-icon', href: '/logo.png', color: themeColor }],
    
    // SEO元标签
    ['meta', { name: 'theme-color', content: themeColor }],
    ['meta', { name: 'author', content: siteAuthor }],
    ['meta', { name: 'keywords', content: '前端开发,JavaScript,Vue,React,TypeScript,CSS,前端工程化,性能优化' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: siteName }],
    ['meta', { property: 'og:description', content: siteDescription }],
    ['meta', { property: 'og:url', content: siteDomain }],
    ['meta', { property: 'og:image', content: `${siteDomain}/logo.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: siteName }],
    ['meta', { name: 'twitter:description', content: siteDescription }],
    ['meta', { name: 'twitter:image', content: `${siteDomain}/logo.png` }],
    ['link', { rel: 'sitemap', href: '/sitemap.xml' }],
  ],
  
  // 网站生成完成后的钩子函数
  buildEnd: async ({ outDir }) => {
    // 关闭网站地图流
    sitemap.end()
    console.log('网站地图已生成在 ' + resolve(process.cwd(), 'docs/public/sitemap.xml'))
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
    logo: '/logo.png',
    
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
        text: '技术博客', 
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>',
        items: [
          { text: 'JavaScript', link: '/posts/javascript/' },
          { text: 'TypeScript', link: '/posts/typescript/' },
          { text: 'Vue', link: '/posts/vue/' },
          { text: 'React', link: '/posts/react/' },
          { text: '前端工程化', link: '/posts/engineering/' },
          { text: '性能优化', link: '/posts/performance/' },
        ]
      },
      { 
        text: '开源项目', 
        link: '/projects/',
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"></path><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path><path d="M16 19h6"></path><path d="M19 16v6"></path></svg>'
      },
      { 
        text: '文章标签', 
        link: '/tags',
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><path d="M7 7h.01"></path></svg>'
      },
      { 
        text: 'Midea实习', 
        link: '/posts/midea/',
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>'
      },
      { 
        text: '关于我', 
        link: '/about/',
        before: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>'
      }
    ],
    
    sidebar: {
      '/posts/javascript/': [
        {
          text: 'JavaScript系列',
          items: [
            { text: 'JavaScript基础', link: '/posts/javascript/basics' },
          ]
        }
      ],
      '/posts/typescript/': [
        {
          text: 'TypeScript系列',
          items: [
            { text: 'TypeScript基础', link: '/posts/typescript/basics' },
          ]
        }
      ],
      '/posts/vue/': [
        {
          text: 'Vue系列',
          items: [
            { text: 'Vue基础', link: '/posts/vue/basics' },
          ]
        }
      ],
      '/posts/react/': [
        {
          text: 'React系列',
          items: [
            { text: '基础', link: '/posts/react/basics' },
          ]
        }
      ],
      '/posts/engineering/': [
        {
          text: '前端工程化',
          items: [
            { text: '前端工程化概述', link: '/posts/engineering/overview' },
          ]
        }
      ],
      '/posts/performance/': [
        {
          text: '性能优化',
          items: [
            { text: '前端性能优化概述', link: '/posts/performance/overview' },
          ]
        }
      ],
      '/posts/midea/': [
        {
          text: 'Midea实习感悟',
          items: [
            { text: '实习经历', link: '/posts/midea/experience' },
          ]
        }
      ],
      '/projects/': [
        {
          text: '开源项目',
          items: [
            { text: '项目概览', link: '/projects/' },
            { text: 'Atom-Video', link: '/projects/video' },
            { text: 'Atom-Stats', link: '/projects/stats' },
          ]
        }
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zjtdzyx' },
    ],
    
    footer: {
      message: '基于 VitePress 构建',
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