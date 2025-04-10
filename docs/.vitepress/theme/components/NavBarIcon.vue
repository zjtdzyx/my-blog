<template>
  <div class="icon" v-if="icon" v-html="icon"></div>
  <span>{{ text }}</span>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
}
</style> 