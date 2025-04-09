<script setup>
import DefaultTheme from 'vitepress/theme'
import NavIcons from './components/NavIcons.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <NavIcons />
    </template>
  </Layout>
</template> 