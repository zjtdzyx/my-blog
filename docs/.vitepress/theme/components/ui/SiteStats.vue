<script setup>
  import { ref, onMounted, computed } from 'vue'

  const props = defineProps({
    creationDate: {
      type: String,
      default: '2023-01-01' // 网站创建日期，格式：YYYY-MM-DD
    },
    lastDeployDate: {
      type: String,
      default: '' // 最后部署日期，不设置则使用当前日期
    }
  })

  // 计算运行时间
  const runningDays = ref(0)
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)

  // 本次访问统计
  const pageStartTime = ref(0)
  const pageLoadTime = ref(0)
  const resourceCount = ref(0)
  const resourceSize = ref(0)
  const jsTime = ref(0)
  const cssTime = ref(0)

  // 格式化
  const formattedResourceSize = computed(() => {
    if (resourceSize.value < 1024) {
      return `${resourceSize.value.toFixed(2)} KB`
    } else {
      return `${(resourceSize.value / 1024).toFixed(2)} MB`
    }
  })

  onMounted(() => {
    // 启动运行时间计算
    updateRunningTime()
    setInterval(updateRunningTime, 1000)

    // 性能统计
    collectPerformanceData()
  })

  function updateRunningTime() {
    const now = new Date()
    const created = new Date(props.creationDate)
    const diff = now - created

    runningDays.value = Math.floor(diff / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
  }

  function collectPerformanceData() {
    if (typeof window === 'undefined' || !window.performance) return

    // 页面加载时间
    const perfData = window.performance.timing
    pageStartTime.value = perfData.navigationStart
    pageLoadTime.value = perfData.loadEventEnd - perfData.navigationStart

    // 资源统计
    const resources = window.performance.getEntriesByType('resource')
    resourceCount.value = resources.length

    let totalSize = 0
    let jsLoadTime = 0
    let cssLoadTime = 0

    resources.forEach(resource => {
      // 估算资源大小：传输大小或编码大小
      const size = resource.transferSize || resource.encodedBodySize || 0
      totalSize += size

      // 分类计算加载时间
      const duration = resource.duration || 0
      if (resource.initiatorType === 'script') {
        jsLoadTime += duration
      } else if (resource.initiatorType === 'css') {
        cssLoadTime += duration
      }
    })

    // 转换为KB
    resourceSize.value = totalSize / 1024
    jsTime.value = jsLoadTime
    cssTime.value = cssLoadTime
  }

  // 格式化日期
  function formatDate(dateString) {
    if (!dateString) {
      return new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 格式化时间（毫秒 -> 秒）
  function formatTime(ms) {
    return (ms / 1000).toFixed(2) + ' 秒'
  }
</script>

<template>
  <div class="site-stats">
    <div class="stats-header">
      <div class="stats-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20V10"></path>
          <path d="M18 20V4"></path>
          <path d="M6 20v-4"></path>
        </svg>
      </div>
      <h2>网站数据</h2>
    </div>

    <div class="stats-grid">
      <!-- 运行时间 -->
      <div class="stat-card">
        <div class="stat-icon running-time">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-title">运行时间</div>
          <div class="stat-value running-time-value">
            <span class="time-unit">
              <span class="time-number">{{ runningDays }}</span>
              <span class="time-label">天</span>
            </span>
            <span class="time-unit">
              <span class="time-number">{{ hours }}</span>
              <span class="time-label">时</span>
            </span>
            <span class="time-unit">
              <span class="time-number">{{ minutes }}</span>
              <span class="time-label">分</span>
            </span>
            <span class="time-unit">
              <span class="time-number">{{ seconds }}</span>
              <span class="time-label">秒</span>
            </span>
          </div>
        </div>
      </div>

      <!-- 页面加载时间 -->
      <div class="stat-card">
        <div class="stat-icon page-load">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
            </path>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-title">页面加载</div>
          <div class="stat-value">{{ formatTime(pageLoadTime) }}</div>
        </div>
      </div>

      <!-- 资源数量 -->
      <div class="stat-card">
        <div class="stat-icon resources">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
            <line x1="16" y1="8" x2="2" y2="22"></line>
            <line x1="17.5" y1="15" x2="9" y2="15"></line>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-title">资源数量</div>
          <div class="stat-value">{{ resourceCount }}</div>
        </div>
      </div>

      <!-- 资源大小 -->
      <div class="stat-card">
        <div class="stat-icon size">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
            </path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-title">资源大小</div>
          <div class="stat-value">{{ formattedResourceSize }}</div>
        </div>
      </div>

      <!-- JS加载时间 -->
      <div class="stat-card">
        <div class="stat-icon js-time">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <path d="M10 12a2 2 0 0 0-2 2v4h4v-4a2 2 0 0 0-2-2z"></path>
            <path d="M18 12a2 2 0 0 0-4 0v6h4v-6z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-title">JS加载</div>
          <div class="stat-value">{{ formatTime(jsTime) }}</div>
        </div>
      </div>

      <!-- CSS加载时间 -->
      <div class="stat-card">
        <div class="stat-icon css-time">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4">
            </path>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-title">CSS加载</div>
          <div class="stat-value">{{ formatTime(cssTime) }}</div>
        </div>
      </div>
    </div>

    <div class="stats-footer">
      <div class="last-updated">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>最后更新于 {{ formatDate(lastDeployDate) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .site-stats {
    margin: 3rem 0;
    padding: 2rem;
    border-radius: 16px;
    background: var(--vp-c-bg-soft);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
  }

  .stats-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  .stats-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(45deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-right: 1rem;
  }

  .stats-header h2 {
    font-size: 1.5rem;
    margin: 0;
    background: linear-gradient(45deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    padding: 1.5rem;
    border-radius: 12px;
    background: var(--vp-c-bg);
    display: flex;
    align-items: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    border: 1px solid rgba(var(--vp-c-brand-rgb), 0.05);
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(var(--vp-c-brand-rgb), 0.1);
    border-color: rgba(var(--vp-c-brand-rgb), 0.1);
  }

  .stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    color: white;
    flex-shrink: 0;
  }

  .stat-icon.running-time {
    background: linear-gradient(45deg, #3b82f6, #60a5fa);
  }

  .stat-icon.page-load {
    background: linear-gradient(45deg, #10b981, #34d399);
  }

  .stat-icon.resources {
    background: linear-gradient(45deg, #f59e0b, #fbbf24);
  }

  .stat-icon.size {
    background: linear-gradient(45deg, #ef4444, #f87171);
  }

  .stat-icon.js-time {
    background: linear-gradient(45deg, #8b5cf6, #a78bfa);
  }

  .stat-icon.css-time {
    background: linear-gradient(45deg, #ec4899, #f472b6);
  }

  .stat-content {
    flex: 1;
  }

  .stat-title {
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
    margin-bottom: 0.5rem;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    line-height: 1.2;
  }

  .running-time-value {
    font-size: 1.1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .time-unit {
    display: flex;
    align-items: baseline;
  }

  .time-number {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--vp-c-brand);
    min-width: 1.2em;
    text-align: center;
  }

  .time-label {
    font-size: 0.75rem;
    color: var(--vp-c-text-2);
    margin-left: 2px;
  }

  .stats-footer {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
  }

  .last-updated {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: var(--vp-c-text-3);
  }

  .last-updated svg {
    margin-right: 0.5rem;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .site-stats {
      padding: 1.5rem;
    }

    .stats-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .stat-card {
      padding: 1.2rem;
    }

    .stat-icon {
      width: 36px;
      height: 36px;
    }

    .stat-value {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 640px) {
    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }

    .stat-card {
      flex-direction: column;
      text-align: center;
    }

    .stat-icon {
      margin: 0 0 0.8rem 0;
    }

    .running-time-value {
      justify-content: center;
    }
  }
</style>