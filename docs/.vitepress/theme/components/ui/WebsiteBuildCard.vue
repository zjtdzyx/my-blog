<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'var(--vp-c-brand)'
    }
  })
</script>

<template>
  <div class="website-build-card" :style="{ '--card-color': color }">
    <div class="card-icon" v-if="icon">
      <img :src="icon" :alt="title" class="icon-img">
    </div>
    <div class="card-icon-default" v-else>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer" class="card-link">
        <span>了解更多</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
    <div class="card-shine"></div>
  </div>
</template>

<style scoped>
  .website-build-card {
    position: relative;
    padding: 2rem;
    border-radius: 16px;
    background: var(--vp-c-bg-soft);
    border: 1px solid rgba(var(--vp-c-brand-rgb), 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .website-build-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--card-color);
    transition: transform 0.3s ease;
    transform: scaleX(0.3);
    transform-origin: left;
  }

  .website-build-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .website-build-card:hover::before {
    transform: scaleX(1);
  }

  .card-icon,
  .card-icon-default {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: rgba(var(--vp-c-brand-rgb), 0.1);
    color: var(--card-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
  }

  .card-icon-default {
    background: linear-gradient(45deg, var(--card-color) 0%, var(--card-color) 100%);
    color: white;
  }

  .website-build-card:hover .card-icon,
  .website-build-card:hover .card-icon-default {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(var(--vp-c-brand-rgb), 0.2);
  }

  .icon-img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }

  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0 0 1rem;
    color: var(--vp-c-text-1);
    transition: color 0.3s ease;
  }

  .website-build-card:hover .card-title {
    background: linear-gradient(45deg, var(--card-color) 0%, var(--card-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .card-description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--vp-c-text-2);
    margin: 0 0 1.5rem;
    flex: 1;
  }

  .card-link {
    display: inline-flex;
    align-items: center;
    font-size: 0.9rem;
    color: var(--card-color);
    text-decoration: none;
    transition: all 0.3s ease;
    opacity: 0.8;
    margin-top: auto;
  }

  .card-link svg {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
  }

  .website-build-card:hover .card-link {
    opacity: 1;
  }

  .website-build-card:hover .card-link svg {
    transform: translateX(3px);
  }

  .card-shine {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.05) 50%,
        rgba(255, 255, 255, 0) 100%);
    transform: translateX(-100%);
    transition: transform 0.8s ease;
  }

  .website-build-card:hover .card-shine {
    transform: translateX(100%);
  }

  @media (max-width: 640px) {
    .website-build-card {
      padding: 1.5rem;
    }

    .card-icon,
    .card-icon-default {
      width: 50px;
      height: 50px;
      margin-bottom: 1rem;
    }

    .card-title {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }

    .card-description {
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
  }
</style>