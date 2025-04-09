<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  // 在首页添加悬浮元素
  addFloatingElements();
  
  // 监听滚动事件以添加导航栏阴影
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

function addFloatingElements() {
  // 仅在首页添加装饰性悬浮元素
  if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
    const container = document.querySelector('.VPHero') || document.querySelector('.VPHome');
    
    if (container) {
      const elements = [
        { className: 'floating-element floating-element-1' },
        { className: 'floating-element floating-element-2' },
        { className: 'floating-element floating-element-3' }
      ];
      
      elements.forEach(element => {
        const div = document.createElement('div');
        div.className = element.className;
        container.appendChild(div);
      });
    }
  }
}

function handleScroll() {
  const nav = document.querySelector('.VPNav');
  if (nav) {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
}
</script>

<template>
  <div style="display: none;"></div>
</template> 