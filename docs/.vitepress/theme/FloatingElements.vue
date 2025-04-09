<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const addFloatingElements = () => {
  // 只在首页显示浮动元素
  if (route.path !== '/') return

  const heroContainer = document.querySelector('.VPHero')
  if (!heroContainer) return

  // 创建浮动容器
  const floatingContainer = document.createElement('div')
  floatingContainer.className = 'floating-elements-container'
  heroContainer.appendChild(floatingContainer)

  // 添加几何形状
  const shapes = ['circle', 'square', 'triangle', 'hexagon', 'dot']
  const colors = ['#3eaf7c', '#6366f1', '#ec4899', '#f97316', '#06b6d4']
  
  for (let i = 0; i < 15; i++) {
    const shape = document.createElement('div')
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)]
    const color = colors[Math.floor(Math.random() * colors.length)]
    
    shape.className = `floating-shape ${shapeType}`
    shape.style.backgroundColor = color
    shape.style.left = `${Math.random() * 100}%`
    shape.style.top = `${Math.random() * 100}%`
    shape.style.animationDelay = `${Math.random() * 5}s`
    shape.style.animationDuration = `${10 + Math.random() * 20}s`
    
    floatingContainer.appendChild(shape)
  }
  
  // 添加模糊渐变球
  for (let i = 0; i < 3; i++) {
    const blob = document.createElement('div')
    blob.className = 'floating-blob'
    blob.style.left = `${10 + Math.random() * 80}%`
    blob.style.top = `${10 + Math.random() * 80}%`
    blob.style.animationDelay = `${Math.random() * 5}s`
    
    const hue = Math.floor(Math.random() * 360)
    blob.style.background = `radial-gradient(circle, hsla(${hue}, 100%, 70%, 0.5), hsla(${hue + 60}, 100%, 70%, 0.1))`
    
    floatingContainer.appendChild(blob)
  }

  // 添加CSS样式
  const style = document.createElement('style')
  style.id = 'floating-elements-style'
  style.innerHTML = `
    .floating-elements-container {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    }
    
    .floating-shape {
      position: absolute;
      opacity: 0.6;
      animation: float linear infinite;
      filter: blur(0.5px);
    }
    
    .floating-shape.circle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    
    .floating-shape.square {
      width: 25px;
      height: 25px;
    }
    
    .floating-shape.triangle {
      width: 0;
      height: 0;
      background-color: transparent !important;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 26px solid currentColor;
    }
    
    .floating-shape.triangle::after {
      content: '';
      position: absolute;
      top: 0;
      left: -15px;
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-bottom: 26px solid;
      border-bottom-color: inherit;
    }
    
    .floating-shape.hexagon {
      width: 30px;
      height: 17.32px;
      background-color: transparent !important;
      position: relative;
    }
    
    .floating-shape.hexagon::before,
    .floating-shape.hexagon::after {
      content: '';
      position: absolute;
      width: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
    }
    
    .floating-shape.hexagon::before {
      bottom: 100%;
      border-bottom: 8.66px solid currentColor;
    }
    
    .floating-shape.hexagon::after {
      top: 100%;
      border-top: 8.66px solid currentColor;
    }
    
    .floating-shape.dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .floating-blob {
      position: absolute;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      filter: blur(40px);
      opacity: 0.4;
      animation: blob 25s infinite alternate;
    }
    
    @keyframes float {
      0% {
        transform: translate(0, 0) rotate(0);
      }
      25% {
        transform: translate(100px, 50px) rotate(90deg);
      }
      50% {
        transform: translate(50px, 100px) rotate(180deg);
      }
      75% {
        transform: translate(-50px, 50px) rotate(270deg);
      }
      100% {
        transform: translate(0, 0) rotate(360deg);
      }
    }
    
    @keyframes blob {
      0% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0, 0) scale(1);
      }
    }
  `
  document.head.appendChild(style)
}

const removeFloatingElements = () => {
  const container = document.querySelector('.floating-elements-container')
  if (container) container.remove()
  
  const style = document.getElementById('floating-elements-style')
  if (style) style.remove()
}

onMounted(() => {
  addFloatingElements()
})

onUnmounted(() => {
  removeFloatingElements()
})
</script>

<template>
  <div style="display: none;"></div>
</template>

<style scoped>
/* 组件级样式可以在这里添加 */
</style> 