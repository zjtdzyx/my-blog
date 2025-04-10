<template>
  <div class="sponsor-container">
    <button
      class="sponsor-button"
      @click="togglePopup"
      :class="{ 'is-dark': isDark }"
    >
      <span class="sponsor-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
          <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"></path>
        </svg>
      </span>
      <span class="sponsor-text">{{ buttonText }}</span>
    </button>

    <div v-if="isOpen" class="sponsor-popup" :class="{ 'is-dark': isDark }">
      <div class="popup-header">
        <h3>{{ title }}</h3>
        <button class="close-button" @click="togglePopup" aria-label="关闭弹窗">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="popup-content">
        <p class="sponsor-message">{{ message }}</p>
        
        <div class="payment-options">
          <div 
            v-for="(option, index) in paymentOptions" 
            :key="index"
            class="payment-option"
            :class="{ active: activeOption === index }"
            @click="setActiveOption(index)"
          >
            <div class="option-label">{{ option.label }}</div>
            <div class="option-icon" v-html="option.icon"></div>
          </div>
        </div>
        
        <div class="qr-codes">
          <div 
            v-for="(option, index) in paymentOptions" 
            :key="index"
            class="qr-code-container"
            :class="{ active: activeOption === index }"
          >
            <img :src="option.qrCode" :alt="option.label + '二维码'" class="qr-code" />
            <p class="qr-code-label">{{ option.scanText }}</p>
          </div>
        </div>
      </div>
      
      <div class="popup-footer">
        <p>{{ footerText }}</p>
        <div class="sponsor-hearts">
          <span v-for="n in 3" :key="n" class="heart">❤️</span>
        </div>
      </div>
    </div>
    
    <div v-if="isOpen" class="popup-backdrop" @click="togglePopup"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  buttonText: {
    type: String,
    default: '赞助本站'
  },
  title: {
    type: String,
    default: '赞助作者'
  },
  message: {
    type: String,
    default: '如果我的博客对您有所帮助，可以考虑请我喝杯咖啡，这将是我持续创作的动力！'
  },
  footerText: {
    type: String,
    default: '感谢您的支持，让我们一起让技术世界更美好！'
  },
  paymentOptions: {
    type: Array,
    default: () => [
      {
        label: '微信支付',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#07C160"><path d="M19.2 8.5c-2.3-2.3-5.6-3.5-8.8-3C6.7 6 3.3 9.1 3 12.9c-.1 1.3.1 2.7.7 3.8.4.7 1 1.2 1.3 2 .1.2.1.4 0 .7l-.3 1.1c-.1.3-.2.5.2.6.1 0 .2.1.3 0l1.5-.8c.4-.2.6-.3 1.1 0 .3.2.6.3.9.4 3.2.9 6.4-.7 8-2.3.9-.7 1.6-1.7 2.2-2.7-1.6-1.2-2.5-3-2.6-5 0-1.6.8-3.1 1.9-4.2z"></path><path d="M9.1 9.2c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1-.5-1.1-1.1-1.1zm5.8 0c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1 1.1-.5 1.1-1.1-.5-1.1-1.1-1.1zm2.4 5.2c-.9.9-2.1 1.3-3.7 1.3s-2.8-.4-3.7-1.3c-.1-.2-.4-.2-.6 0-.1.1-.2.3 0 .5 1 1 2.4 1.6 4.2 1.6s3.1-.5 4.2-1.6c.1-.1.1-.4 0-.5-.1-.1-.3-.1-.4 0z" fill="#fff"></path></svg>',
        qrCode: '/sponsor/wechat.png',
        scanText: '微信扫码支持'
      },
      {
        label: '支付宝',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024" fill="#1677FF"><path d="M230.404 729.775c-1.089 4.335-2.151 8.669-3.19 13.003-25.495 101.821 70.05 143.296 128.782 106.806 38.306-23.866 75.51-56.99 111.376-96.163-62.195-34.356-111.561-74.746-148.957-116.59-41.866 30.653-72.556 63.507-87.979 92.944h-.032zM908.062 299.446v-85.223H115.06v85.223h793.002zm0 41.425H115.06v427.866h396.472c-5.91-13.417-10.588-25.079-13.417-33.729H156.517v-352.42h710.088v194.548c32.282 11.33 61.825 24.747 88.551 39.925V340.87h-47.094z"></path><path d="M511.654 442.569c19.328 0 37.934 1.57 55.82 4.354 31.743-32.654 56.99-76.188 75.171-125.297H344.7c24.77 60.754 77.304 120.943 166.985 120.943h-.032zm81.11 40.777c85.906 22.811 142.23 58.56 178.478 94.999 60.734-61.076 99.687-145.79 99.687-239.357 0-186.994-151.576-338.602-338.602-338.602-187.026 0-338.602 151.576-338.602 338.602 0 93.566 38.953 178.28 99.654 239.357 40.465-40.777 108.41-89.625 196.373-107.256-9.499-16.623-17.695-33.931-24.116-51.21-21.83-2.395-41.554-5.91-59.219-10.24-10.24 14.178-21.17 27.26-32.623 39.226 13.417 13.003 29.252 26.006 47.579 38.643-2.784-3.19-5.538-6.379-8.323-9.568a887.613 887.613 887.613 0 0 1 25.172-26.816c-39.267-16.19-68.89-37.965-89.264-62.712-8.669 9.13-18.399 18.078-28.658 26.747a332.45 332.45 0 0 0 39.958 40.777c36.845 32.282 82.909 57.688 131.936 73.197 31.36-46.13 42.301-121.286 42.301-121.286l-178.28-78.706s-14.818 41.425-24.747 66.498c19.328 5.123 46.13 11.681 79.726 20.13 6.708 19.67 15.935 39.267 27.616 57.689-101.191 7.58-175.288 32.282-230.782 65.794a338.187 338.187 0 0 1-89.984-229.765c0-188.083 152.7-340.783 340.816-340.783 188.083 0 340.783 152.7 340.783 340.783 0 88.2-33.729 167.687-87.979 227.998-25.495-26.816-67.36-55.075-132.34-76.603-24.43 66.156-69.269 126.073-129.217 163.104 32.25 7.94 65.409 12.262 98.933 12.262 61.427 0 122.408-14.178 178.28-41.425v-32.623c-55.872 29.22-117.301 45.442-178.28 45.442-34.356 0-68.153-4.71-100.806-13.8-31.36 18.753-65.104 33.267-105.54 43.158-5.91 15.54-13.8 29.22-20.098 38.953 56.62-5.123 105.54-20.098 148.957-41.425a351.008 351.008 0 0 0 77.657 8.67c187.026 0 338.602-151.576 338.602-338.602 0-93.566-38.953-178.28-99.687-239.357-36.248 36.438-92.572 72.187-178.478 94.998z"></path></svg>',
        qrCode: '/sponsor/alipay.png',
        scanText: '支付宝扫码支持'
      }
    ]
  }
})

const { isDark } = useData()
const isOpen = ref(false)
const activeOption = ref(0)

const togglePopup = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const setActiveOption = (index) => {
  activeOption.value = index
}
</script>

<style scoped>
.sponsor-container {
  position: relative;
  display: inline-block;
}

.sponsor-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #ff6b6b, #ff9f43);
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
}

.sponsor-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 107, 107, 0.4);
}

.sponsor-button.is-dark {
  background: linear-gradient(135deg, #ff6b6b, #ff9f43);
}

.sponsor-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.sponsor-text {
  line-height: 1;
}

.sponsor-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 90%;
  max-width: 440px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  animation: popup-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sponsor-popup.is-dark {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.popup-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: var(--vp-c-gray-light-3);
}

.sponsor-message {
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.payment-options {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.payment-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.payment-option:hover {
  background-color: var(--vp-c-gray-light-4);
}

.payment-option.active {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-dimm);
}

.option-label {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.qr-codes {
  position: relative;
  height: 240px;
  margin-bottom: 1.5rem;
}

.qr-code-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  visibility: hidden;
}

.qr-code-container.active {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}

.qr-code {
  width: 180px;
  height: 180px;
  margin-bottom: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.qr-code-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.popup-footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.popup-footer p {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.sponsor-hearts {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.heart {
  animation: heartbeat 1.5s infinite;
}

.heart:nth-child(2) {
  animation-delay: 0.2s;
}

.heart:nth-child(3) {
  animation-delay: 0.4s;
}

.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

@keyframes popup-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.2);
  }
  30% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .sponsor-popup {
    width: 90%;
    padding: 1.25rem;
  }
  
  .payment-options {
    gap: 0.5rem;
  }
  
  .payment-option {
    padding: 0.5rem 1rem;
  }
  
  .qr-code {
    width: 160px;
    height: 160px;
  }
  
  .qr-codes {
    height: 220px;
  }
}
</style> 