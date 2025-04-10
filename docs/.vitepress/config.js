import { defineConfig } from 'vitepress'
import { SearchPlugin } from 'vitepress-plugin-search'

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

export default defineConfig({
  title: siteName,
  description: siteDescription,
  lang: 'zh-CN',
  
  // 自定义域名配置
  base: '/my-blog/', // 更新为当前仓库名
  
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
  ],
  
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
      { text: '首页', link: '/' },
      { 
        text: '技术博客', 
        items: [
          { text: 'JavaScript', link: '/posts/javascript/' },
          { text: 'TypeScript', link: '/posts/typescript/' },
          { text: 'Vue', link: '/posts/vue/' },
          { text: 'React', link: '/posts/react/' },
          { text: '前端工程化', link: '/posts/engineering/' },
          { text: '性能优化', link: '/posts/performance/' },
        ]
      },
      { text: '开源项目', link: '/projects/' },
      { text: 'Midea实习', link: '/posts/midea/' },
      { text: '关于我', link: '/about/' }
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