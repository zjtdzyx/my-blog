<template>
  <div class="article-footer">
    <div class="footer-section social-share">
      <h3>分享这篇文章</h3>
      <div class="share-buttons">
        <a 
          :href="`https://twitter.com/intent/tweet?text=${encodeTitle}&url=${encodeUrl}`" 
          target="_blank" 
          class="share-button twitter"
          title="分享到Twitter"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.599-.1-.898a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
          </svg>
        </a>
        <a 
          :href="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeUrl}`" 
          target="_blank" 
          class="share-button linkedin"
          title="分享到LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
          </svg>
        </a>
        <a 
          :href="`https://t.me/share/url?url=${encodeUrl}&text=${encodeTitle}`" 
          target="_blank" 
          class="share-button telegram"
          title="分享到Telegram"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"></path>
          </svg>
        </a>
      </div>
    </div>
    
    <div class="footer-section support-author">
      <h3>支持作者</h3>
      <p>如果这篇文章对您有帮助，可以考虑支持作者继续创作更多优质内容。</p>
      <SponsorButton
        buttonText="赞赏支持 ❤️"
        title="赞赏支持"
        message="感谢您的支持！您的鼓励是我继续创作的动力。"
      />
    </div>
    
    <div class="footer-divider"></div>
    
    <div class="footer-section author-info">
      <img src="/avatar.png" alt="ZYX" class="author-avatar" />
      <div class="author-bio">
        <h3>关于作者</h3>
        <p>前端开发工程师，热爱技术，喜欢分享。专注于Vue、React等前端技术栈，同时探索全栈开发领域。</p>
        <div class="author-links">
          <a href="https://github.com/zjtdzyx" target="_blank" class="author-link github">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>GitHub</span>
          </a>
          <a href="/about/" class="author-link about">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <span>关于我</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { site, frontmatter } = useData()
const route = useRoute()

const title = computed(() => frontmatter.value.title || site.value.title)
const url = computed(() => {
  const baseUrl = site.value.themeConfig.domain || 'https://zjtxzyx.xyz'
  return `${baseUrl}${route.path}`
})

const encodeTitle = computed(() => encodeURIComponent(title.value))
const encodeUrl = computed(() => encodeURIComponent(url.value))
</script>

<style scoped>
.article-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.footer-section {
  margin-bottom: 2.5rem;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.share-buttons {
  display: flex;
  gap: 0.75rem;
}

.share-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  transition: all 0.2s ease;
}

.share-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.twitter {
  background-color: #1DA1F2;
}

.linkedin {
  background-color: #0077B5;
}

.telegram {
  background-color: #0088cc;
}

.support-author {
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.support-author p {
  margin-bottom: 1.25rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.footer-divider {
  height: 1px;
  background-color: var(--vp-c-divider);
  margin: 2rem 0;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--vp-c-brand);
  padding: 3px;
}

.author-bio {
  flex: 1;
}

.author-bio h3 {
  margin-top: 0;
}

.author-bio p {
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
}

.author-links {
  display: flex;
  gap: 1rem;
}

.author-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  transition: all 0.2s ease;
  text-decoration: none;
}

.author-link:hover {
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
}

@media (max-width: 768px) {
  .author-info {
    flex-direction: column;
    text-align: center;
  }
  
  .author-bio {
    width: 100%;
  }
  
  .author-links {
    justify-content: center;
  }
}
</style> 