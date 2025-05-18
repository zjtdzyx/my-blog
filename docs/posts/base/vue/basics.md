# Vue.js基础知识

::: info
本文介绍Vue.js的基础知识，适合想要学习Vue.js框架的开发者阅读。
:::

## Vue.js简介

Vue.js是一个用于构建用户界面的渐进式JavaScript框架。与其他重量级框架不同，Vue被设计为可以自底向上逐层应用。Vue的核心库只关注视图层，方便与其他库或已有项目整合。

### Vue.js的特点

1. **渐进式框架**：你可以将Vue作为你应用的一部分嵌入，也可以使用Vue全家桶进行完整的项目开发
2. **响应式系统**：自动追踪JavaScript状态变化并更新DOM
3. **组件化开发**：通过可复用、可组合的组件构建应用
4. **虚拟DOM**：高效的DOM更新机制
5. **丰富的生态系统**：包括Vue Router、Vuex、Vue CLI等官方维护的库和工具

## Vue3与Vue2的区别

Vue3带来了许多重大改进和新特性：

1. **Composition API**：提供了一种更灵活的组织组件逻辑的方式
2. **更好的TypeScript支持**：Vue3是用TypeScript重写的，提供更好的类型推断
3. **性能提升**：更小的包体积，更快的渲染速度
4. **Teleport组件**：允许将组件的内容渲染到DOM的不同位置
5. **Fragments**：组件可以有多个根节点
6. **Suspense**：处理异步组件的新机制

## 创建Vue应用

### 使用CDN

```html
<!DOCTYPE html>
<html>
<head>
  <title>Vue Hello World</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>
<body>
  <div id="app">
    {{ message }}
  </div>

  <script>
    const { createApp } = Vue
    
    createApp({
      data() {
        return {
          message: 'Hello Vue!'
        }
      }
    }).mount('#app')
  </script>
</body>
</html>
```

### 使用Vue CLI

```bash
# 安装Vue CLI
npm install -g @vue/cli

# 创建项目
vue create my-project

# 启动开发服务器
cd my-project
npm run serve
```

### 使用Vite

```bash
# 使用Vite创建Vue项目
npm create vite@latest my-vue-app -- --template vue

# 安装依赖
cd my-vue-app
npm install

# 启动开发服务器
npm run dev
```

## Vue组件基础

Vue组件是Vue应用的基本构建块。组件可以重复使用，并且可以嵌套在其他组件中。

### 组件的基本结构

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<style scoped>
.hello {
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### 使用组合式API (Composition API)

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  msg: String
})

const count = ref(0)

function increment() {
  count.value++
}
</script>

<style scoped>
.hello {
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## Vue的核心概念

### 模板语法

Vue使用基于HTML的模板语法，允许你声明式地将DOM绑定到底层组件实例的数据。

```vue
<template>
  <!-- 文本插值 -->
  <p>{{ message }}</p>
  
  <!-- 绑定属性 -->
  <div v-bind:id="dynamicId"></div>
  <div :id="dynamicId"></div> <!-- 简写 -->
  
  <!-- 条件渲染 -->
  <p v-if="seen">Now you see me</p>
  <p v-else>Now you don't</p>
  
  <!-- 列表渲染 -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </ul>
  
  <!-- 事件处理 -->
  <button v-on:click="doSomething">Click me</button>
  <button @click="doSomething">Click me</button> <!-- 简写 -->
  
  <!-- 表单输入绑定 -->
  <input v-model="message">
</template>
```

### 响应式基础

Vue的响应式系统会自动追踪变化并更新UI。

#### 选项式API中的响应性

```js
export default {
  data() {
    return {
      count: 0,
      user: {
        name: 'zyx',
        age: 25
      },
      items: ['Apple', 'Banana', 'Cherry']
    }
  },
  methods: {
    increment() {
      this.count++
    },
    updateUser() {
      this.user.age = 26
    },
    addItem() {
      this.items.push('Date')
    }
  }
}
```

#### 组合式API中的响应性

```js
import { ref, reactive } from 'vue'

// ref用于基本类型
const count = ref(0)
function increment() {
  count.value++
}

// reactive用于对象
const user = reactive({
  name: 'zyx',
  age: 25
})
function updateUser() {
  user.age = 26
}

// 数组也可以是响应式的
const items = reactive(['Apple', 'Banana', 'Cherry'])
function addItem() {
  items.push('Date')
}
```

### 计算属性与侦听器

#### 计算属性

```js
// 选项式API
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    }
  }
}

// 组合式API
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed(() => {
  return firstName.value + ' ' + lastName.value
})
```

#### 侦听器

```js
// 选项式API
export default {
  data() {
    return {
      question: '',
      answer: ''
    }
  },
  watch: {
    question(newQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    getAnswer() {
      this.answer = 'Thinking...'
      // 发起API请求等异步操作
    }
  }
}

// 组合式API
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('')

watch(question, (newQuestion) => {
  if (newQuestion.includes('?')) {
    getAnswer()
  }
})

function getAnswer() {
  answer.value = 'Thinking...'
  // 发起API请求等异步操作
}
```

## 组件间通信

### Props（父传子）

```vue
<!-- 父组件 -->
<template>
  <child-component :message="parentMessage" />
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      parentMessage: 'Hello from parent'
    }
  }
}
</script>

<!-- 子组件 -->
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>
```

### 事件（子传父）

```vue
<!-- 子组件 -->
<template>
  <button @click="$emit('custom-event', 'Hello from child')">
    Send to Parent
  </button>
</template>

<!-- 父组件 -->
<template>
  <child-component @custom-event="handleEvent" />
  <p>Message from child: {{ childMessage }}</p>
</template>

<script>
import ChildComponent from './ChildComponent.vue'

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      childMessage: ''
    }
  },
  methods: {
    handleEvent(message) {
      this.childMessage = message
    }
  }
}
</script>
```

### 依赖注入（provide/inject）

```vue
<!-- 祖先组件 -->
<script>
export default {
  provide() {
    return {
      theme: 'dark',
      user: this.user
    }
  },
  data() {
    return {
      user: { name: 'zyx' }
    }
  }
}
</script>

<!-- 后代组件（可以是深层嵌套的） -->
<template>
  <div>
    <p>Theme: {{ theme }}</p>
    <p>User: {{ user.name }}</p>
  </div>
</template>

<script>
export default {
  inject: ['theme', 'user']
}
</script>
```

## Vue Router基础

Vue Router是Vue.js的官方路由管理器。

```js
// router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import User from './views/User.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/users/:id', component: User, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<!-- User.vue -->
<template>
  <div>
    <h2>User {{ id }}</h2>
  </div>
</template>

<script>
export default {
  props: ['id']
}
</script>
```

## Vuex状态管理

Vuex是Vue.js的状态管理模式和库。

```js
// store.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    todos: []
  },
  mutations: {
    increment(state) {
      state.count++
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    async fetchTodos({ commit }) {
      const response = await fetch('https://api.example.com/todos')
      const todos = await response.json()
      todos.forEach(todo => {
        commit('addTodo', todo)
      })
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')
```

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="incrementAsync">+ Async</button>
    
    <ul>
      <li v-for="todo in doneTodos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doneTodos'])
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['incrementAsync', 'fetchTodos'])
  },
  created() {
    this.fetchTodos()
  }
}
</script>
```

## 总结

Vue.js是一个灵活、高效且易于学习的前端框架。通过其渐进式的设计理念，你可以根据需要逐步采用Vue的特性。Vue的生态系统提供了丰富的工具和库，使得构建复杂的单页应用变得更加容易。

::: tip 未来计划
后续将更新更多Vue进阶内容，如：
- Vue3 Composition API详解
- Vue性能优化技巧
- Vue测试最佳实践
- Vue与TypeScript结合使用
::: 