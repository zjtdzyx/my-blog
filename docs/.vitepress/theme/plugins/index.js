/**
 * 插件索引文件
 */

import { LazyLoadPlugin } from './lazyload'

// 导出所有插件
export {
  LazyLoadPlugin
}

// 注册所有插件的辅助函数
export const registerPlugins = (app) => {
  app.use(LazyLoadPlugin)
  
  // 将来可以在这里添加更多插件
  // app.use(OtherPlugin)
} 