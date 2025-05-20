<template>
  <div class="language-switch">
    <button class="language-button" @click="toggleDropdown">
      <span class="current-locale">{{ currentLocaleName }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div v-if="isOpen" class="language-dropdown">
      <a v-for="locale in locales" :key="locale.code" :href="getLocalePath(locale.code, currentPath)"
        :class="{ active: locale.code === currentLocale }" @click.prevent="switchLanguage(locale.code)">
        {{ locale.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useData, useRoute } from 'vitepress'
  import { locales, getLocalePath } from '../../i18n'

  const { site } = useData()
  const route = useRoute()

  const isOpen = ref(false)
  const currentPath = computed(() => route.path)
  const currentLocale = computed(() => {
    const path = route.path
    const locale = locales.find(l => path.startsWith(`/${l.code}`))
    return locale ? locale.code : 'zh-CN'
  })
  const currentLocaleName = computed(() => {
    const locale = locales.find(l => l.code === currentLocale.value)
    return locale ? locale.name : '简体中文'
  })

  function toggleDropdown() {
    isOpen.value = !isOpen.value
  }

  function switchLanguage(locale) {
    const path = getLocalePath(locale, currentPath.value)
    window.location.href = path
  }

  function handleClickOutside(event) {
    const dropdown = document.querySelector('.language-switch')
    if (dropdown && !dropdown.contains(event.target)) {
      isOpen.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

<style scoped>
  .language-switch {
    position: relative;
    display: inline-block;
  }

  .language-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: transparent;
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    color: var(--vp-c-text-1);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .language-button:hover {
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
  }

  .language-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 4px;
    padding: 4px 0;
    min-width: 120px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .language-dropdown a {
    display: block;
    padding: 6px 12px;
    color: var(--vp-c-text-1);
    font-size: 14px;
    text-decoration: none;
    transition: all 0.2s;
  }

  .language-dropdown a:hover {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-brand);
  }

  .language-dropdown a.active {
    color: var(--vp-c-brand);
    font-weight: 500;
  }
</style>