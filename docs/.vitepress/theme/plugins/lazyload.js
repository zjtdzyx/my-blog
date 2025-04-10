import LazyImage from '../components/LazyImage.vue'

/**
 * 懒加载插件
 * 提供LazyImage组件和v-lazy指令
 */
export const LazyLoadPlugin = {
  install(app) {
    // 注册全局组件
    app.component('LazyImage', LazyImage)

    // 添加自定义指令 v-lazy
    app.directive('lazy', {
      mounted(el, binding) {
        if (el.tagName.toLowerCase() !== 'img') {
          console.error('v-lazy指令只能用于img标签')
          return
        }

        // 保存原始src
        const src = binding.value
        // 设置占位图片
        el.setAttribute('src', '/placeholder.svg')
        
        // 使用IntersectionObserver实现懒加载
        const observer = new IntersectionObserver((entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            // 当图片进入视口时加载真实图片
            el.setAttribute('src', src)
            // 加载后停止观察
            observer.disconnect()
          }
        }, {
          threshold: 0.1
        })

        observer.observe(el)
        
        // 保存observer以便清理
        el._lazyLoadObserver = observer
      },
      unmounted(el) {
        // 清理observer
        if (el._lazyLoadObserver) {
          el._lazyLoadObserver.disconnect()
          delete el._lazyLoadObserver
        }
      }
    })
  }
} 