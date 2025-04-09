<script setup>
  import { computed } from 'vue'

  // 组件属性定义
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default: '/projects/default-project.png'
    },
    demoUrl: {
      type: String,
      default: ''
    },
    repoUrl: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: () => []
    },
    progress: {
      type: Number,
      default: 100
    }
  })

  // 计算进度条颜色
  const progressColor = computed(() => {
    if (props.progress < 30) return '#f56c6c'
    if (props.progress < 70) return '#e6a23c'
    return '#67c23a'
  })
</script>

<template>
  <div class="project-card">
    <div class="project-image">
      <img :src="imageUrl" :alt="title" />
    </div>
    <div class="project-content">
      <h3 class="project-title">{{ title }}</h3>

      <div class="project-tags">
        <span v-for="(tag, index) in tags" :key="index" class="project-tag">{{ tag }}</span>
      </div>

      <p class="project-description">{{ description }}</p>

      <div class="project-progress">
        <div class="progress-label">完成度: {{ progress }}%</div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%`, backgroundColor: progressColor }"></div>
        </div>
      </div>

      <div class="project-links">
        <a v-if="demoUrl" :href="demoUrl" target="_blank" class="project-link demo">
          <span class="link-icon">🔍</span>
          查看演示
        </a>
        <a v-if="repoUrl" :href="repoUrl" target="_blank" class="project-link repo">
          <span class="link-icon">📦</span>
          源码仓库
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .project-card {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--vp-c-bg-soft);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .project-image {
    height: 200px;
    overflow: hidden;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .project-card:hover .project-image img {
    transform: scale(1.05);
  }

  .project-content {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .project-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: var(--vp-c-text-1);
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .project-tag {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    background-color: var(--vp-c-brand-dimm);
    color: var(--vp-c-brand-dark);
  }

  .project-description {
    margin-bottom: 1.5rem;
    color: var(--vp-c-text-2);
    line-height: 1.6;
    flex: 1;
  }

  .project-progress {
    margin-bottom: 1.5rem;
  }

  .progress-label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--vp-c-text-2);
  }

  .progress-bar {
    height: 8px;
    background-color: var(--vp-c-bg);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .project-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .project-link {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.2s ease;
    color: var(--vp-c-text-1);
  }

  .project-link.demo {
    background-color: var(--vp-c-brand-dimm);
    color: var(--vp-c-brand-dark);
  }

  .project-link.repo {
    background-color: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-divider);
  }

  .project-link:hover {
    transform: translateY(-2px);
  }

  .project-link.demo:hover {
    background-color: var(--vp-c-brand-dimm-dark);
  }

  .project-link.repo:hover {
    background-color: var(--vp-c-bg-alt);
  }

  .link-icon {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    .project-links {
      flex-direction: column;
    }
  }
</style>