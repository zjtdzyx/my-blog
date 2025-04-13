<script setup>
  const props = defineProps({
    avatar: {
      type: String,
      default: '/placeholder.svg'
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      default: 'var(--vp-c-bg-soft)'
    }
  })
</script>

<template>
  <a :href="link" target="_blank" rel="noopener noreferrer" class="friend-card" :style="{ backgroundColor }">
    <div class="friend-avatar">
      <img :src="avatar" :alt="name" class="avatar-img" loading="lazy">
    </div>
    <div class="friend-info">
      <h3 class="friend-name">{{ name }}</h3>
      <p class="friend-description">{{ description }}</p>
      <div class="friend-link">
        <span class="visit-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </span>
        <span class="visit-text">访问站点</span>
      </div>
    </div>
  </a>
</template>

<style scoped>
  .friend-card {
    display: flex;
    align-items: center;
    padding: 1.2rem;
    border-radius: 12px;
    text-decoration: none;
    color: var(--vp-c-text-1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.04);
    position: relative;
    overflow: hidden;
  }

  .friend-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--vp-c-brand);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .friend-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }

  .friend-card:hover::before {
    opacity: 1;
  }

  .friend-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1.2rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  .friend-card:hover .friend-avatar {
    transform: scale(1.05);
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .friend-card:hover .avatar-img {
    transform: scale(1.1);
  }

  .friend-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .friend-name {
    margin: 0 0 0.4rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .friend-card:hover .friend-name {
    color: var(--vp-c-brand);
  }

  .friend-description {
    margin: 0 0 0.6rem 0;
    font-size: 0.9rem;
    color: var(--vp-c-text-2);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .friend-link {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    color: var(--vp-c-brand-light);
    opacity: 0;
    transform: translateY(5px);
    transition: all 0.3s ease;
  }

  .friend-card:hover .friend-link {
    opacity: 1;
    transform: translateY(0);
  }

  .visit-icon {
    display: inline-flex;
    margin-right: 4px;
  }

  .visit-text {
    font-weight: 500;
  }

  /* 响应式适配 */
  @media (max-width: 640px) {
    .friend-avatar {
      width: 50px;
      height: 50px;
    }

    .friend-name {
      font-size: 1rem;
    }

    .friend-description {
      font-size: 0.8rem;
      -webkit-line-clamp: 1;
    }

    .friend-link {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 深色模式适配 */
  @media (prefers-color-scheme: dark) {
    .friend-card {
      border-color: rgba(255, 255, 255, 0.08);
    }
  }
</style>