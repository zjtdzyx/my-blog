<template>
  <nav class="custom-nav">
    <a
      v-for="item in navItems"
      :key="item.text"
      :href="withBase(item.link)"
      class="nav-item"
      :class="{ active: isActive(item.link) }"
    >
      <span class="nav-icon" v-if="item.icon" v-html="item.icon"></span>
      <span class="nav-text">{{ item.text }}</span>
    </a>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute, withBase } from 'vitepress'

const { theme } = useData()
const route = useRoute()

const navItems = computed(() => theme.value.nav || [])

const isActive = (link) => {
  if (link === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(link)
}
</script>

<style scoped>
.custom-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-item:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}

.nav-item.active {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
}

.nav-icon {
  display: inline-flex;
  margin-right: 8px;
}

.nav-icon svg {
  width: 18px;
  height: 18px;
}

.nav-item:hover .nav-icon svg,
.nav-item.active .nav-icon svg {
  stroke: var(--vp-c-brand);
}
</style> 