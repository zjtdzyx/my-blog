<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const props = defineProps({
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 'auto'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    placeholder: {
      type: String,
      default: '/placeholder.svg'
    },
    threshold: {
      type: Number,
      default: 0.1
    }
  })

  const imgRef = ref(null)
  const isVisible = ref(false)
  const isLoaded = ref(false)
  const observer = ref(null)

  // 图片加载完成处理函数
  const onLoad = () => {
    isLoaded.value = true
  }

  // 图片加载错误处理函数
  const onError = (e) => {
    console.error('图片加载失败', e)
  }

  // 设置Intersection Observer
  const setupObserver = () => {
    if (!window.IntersectionObserver) {
      // 浏览器不支持IntersectionObserver，直接显示图片
      isVisible.value = true
      return
    }

    observer.value = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        isVisible.value = true
        // 停止观察
        observer.value.disconnect()
      }
    }, {
      threshold: props.threshold
    })

    if (imgRef.value) {
      observer.value.observe(imgRef.value)
    }
  }

  onMounted(() => {
    setupObserver()
  })

  onBeforeUnmount(() => {
    // 清理observer
    if (observer.value) {
      observer.value.disconnect()
    }
  })
</script>

<template>
  <div ref="imgRef" class="lazy-image-container" :style="{
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }">
    <div v-if="!isLoaded" class="lazy-image-placeholder">
      <img :src="placeholder" :alt="alt" class="placeholder-img" />
    </div>

    <transition name="lazy-fade">
      <img v-if="isVisible" :src="src" :alt="alt" @load="onLoad" @error="onError" class="lazy-image"
        :class="{ 'lazy-image-loaded': isLoaded }" />
    </transition>
  </div>
</template>

<style scoped>
  .lazy-image-container {
    position: relative;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lazy-image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .placeholder-img {
    max-width: 50%;
    max-height: 50%;
    opacity: 0.5;
  }

  .lazy-image {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.3s ease;
  }

  .lazy-image-loaded {
    opacity: 1;
  }

  .lazy-image:hover {
    transform: scale(1.02);
  }

  .lazy-fade-enter-active {
    transition: opacity 0.5s ease;
  }

  .lazy-fade-enter-from {
    opacity: 0;
  }

  .lazy-fade-enter-to {
    opacity: 1;
  }
</style>