# React基础知识

::: info
本文介绍React的基础知识，适合想要学习React框架的开发者阅读。
:::

## React简介

React是一个用于构建用户界面的JavaScript库，由Facebook开发并开源。React允许开发者创建大型应用，这些应用可以随着数据的变化而自动更新和渲染。

### React的特点

1. **组件化开发**：将UI拆分为独立、可复用的组件
2. **声明式编程**：通过声明UI应该是什么样子，React会处理更新DOM的细节
3. **虚拟DOM**：高效的DOM更新机制，减少实际DOM操作
4. **单向数据流**：数据自上而下流动，使应用更易于理解
5. **丰富的生态系统**：包括React Router、Redux、Material-UI等库

## 创建React应用

### 使用Create React App

```bash
# 安装Create React App
npx create-react-app my-app

# 进入项目目录
cd my-app

# 启动开发服务器
npm start
```

### 使用Vite

```bash
# 创建Vite+React项目
npm create vite@latest my-react-app -- --template react

# 安装依赖
cd my-react-app
npm install

# 启动开发服务器
npm run dev
```

## React组件

React组件是React应用的核心构建块。组件可以是函数组件或类组件。

### 函数组件

```jsx
// 简单的函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 使用箭头函数的函数组件
const Welcome = (props) => {
  return <h1>Hello, {props.name}</h1>;
};

// 使用组件
function App() {
  return <Welcome name="zyx" />;
}
```

### 类组件

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// 使用组件
function App() {
  return <Welcome name="zyx" />;
}
```

## JSX语法

JSX是JavaScript的语法扩展，它看起来像HTML，但具有JavaScript的全部功能。

```jsx
// 基本JSX
const element = <h1>Hello, world!</h1>;

// 在JSX中使用JavaScript表达式
const name = 'zyx';
const element = <h1>Hello, {name}</h1>;

// JSX中的条件渲染
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <h1>Welcome back!</h1>
        : <h1>Please sign up.</h1>
      }
    </div>
  );
}

// JSX中的循环
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <li key={number}>{number}</li>
      )}
    </ul>
  );
}
```

## Props和State

### Props

Props是组件接收的数据，是不可变的（只读）。

```jsx
// 父组件传递props
function ParentComponent() {
  return <ChildComponent name="zyx" age={25} />;
}

// 子组件接收props
function ChildComponent(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

// 解构props
function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

### State

State是组件内部维护的可变数据。

```jsx
// 在函数组件中使用useState Hook
import React, { useState } from 'react';

function Counter() {
  // 声明状态变量和更新函数
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// 在类组件中使用state
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

## 生命周期和Hooks

### 类组件生命周期

```jsx
import React, { Component } from 'react';

class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    console.log('1. Constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('4. componentDidMount');
    // 通常在这里进行数据获取
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('5. shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('6. getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('7. componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('8. componentWillUnmount');
    // 清理工作（取消订阅、定时器等）
  }

  render() {
    console.log('3. render');
    return <div>Lifecycle Demo</div>;
  }
}
```

### React Hooks

React Hooks允许在函数组件中使用状态和其他React特性。

```jsx
// useState Hook - 管理状态
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// useEffect Hook - 处理副作用
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 组件挂载时获取数据
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });

    // 返回清理函数
    return () => {
      // 在组件卸载时执行清理
      console.log('Component unmounting, cleaning up...');
    };
  }, []); // 空依赖数组表示仅在挂载和卸载时执行

  if (loading) return <div>Loading...</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
}

// useContext Hook - 跨组件共享数据
import React, { useContext, createContext } from 'react';

// 创建上下文
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}

// useReducer Hook - 复杂状态管理
import React, { useReducer } from 'react';

// 定义reducer函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

## 事件处理

React的事件处理系统是合成事件系统，它模拟了原生DOM事件。

```jsx
// 基本事件处理
function Button() {
  function handleClick(e) {
    e.preventDefault();
    console.log('Button clicked');
  }

  return <button onClick={handleClick}>Click me</button>;
}

// 使用箭头函数进行内联事件处理
function Button() {
  return (
    <button onClick={(e) => {
      e.preventDefault();
      console.log('Button clicked');
    }}>
      Click me
    </button>
  );
}

// 在类组件中绑定this
class Button extends React.Component {
  constructor(props) {
    super(props);
    // 方法1：在构造函数中绑定
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('Button clicked');
  }

  render() {
    return (
      <div>
        {/* 使用构造函数中绑定的方法 */}
        <button onClick={this.handleClick}>Click me</button>
        
        {/* 方法2：使用箭头函数 */}
        <button onClick={() => this.handleClick()}>Click me</button>
        
        {/* 方法3：使用类属性语法（需要Babel支持） */}
        <button onClick={this.handleClickWithArrow}>Click me</button>
      </div>
    );
  }
  
  // 使用类属性语法定义方法
  handleClickWithArrow = () => {
    console.log('Button clicked');
  }
}
```

## 表单处理

在React中处理表单通常使用受控组件模式。

```jsx
// 受控组件
import React, { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert('A name was submitted: ' + name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

// 处理多个输入
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Form data:', formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## React Router基础

React Router是React应用中常用的路由库。

```jsx
// 安装
// npm install react-router-dom

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 页面组件
function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function User({ match }) {
  return <h2>User: {match.params.id}</h2>;
}

// 应用组件
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/users/1">User 1</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

## Redux状态管理

Redux是React应用中常用的状态管理库。

```jsx
// 安装
// npm install redux react-redux

// actions.js
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

// reducer.js
import { INCREMENT, DECREMENT } from './actions';

const initialState = {
  count: 0
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

export default counterReducer;

// store.js
import { createStore } from 'redux';
import counterReducer from './reducer';

const store = createStore(counterReducer);

export default store;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './Counter';

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default App;

// Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './actions';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Counter;
```

## 性能优化

### React.memo

使用`React.memo`对函数组件进行记忆化，避免不必要的重新渲染。

```jsx
import React from 'react';

function MyComponent(props) {
  /* 渲染逻辑 */
  return <div>{props.name}</div>;
}

// 仅当props变更时才会重新渲染
export default React.memo(MyComponent);

// 自定义比较函数
export default React.memo(MyComponent, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
});
```

### useMemo和useCallback

使用`useMemo`缓存计算结果，使用`useCallback`缓存函数引用。

```jsx
import React, { useState, useMemo, useCallback } from 'react';

function ExpensiveComponent({ data, onItemClick }) {
  // 缓存计算结果
  const processedData = useMemo(() => {
    return data.map(item => item * 2);
  }, [data]); // 只有当data变化时才重新计算

  // 缓存函数引用
  const handleClick = useCallback((item) => {
    console.log('Item clicked:', item);
    onItemClick(item);
  }, [onItemClick]); // 只有当onItemClick变化时才重新创建函数

  return (
    <div>
      {processedData.map((item, index) => (
        <button key={index} onClick={() => handleClick(item)}>
          {item}
        </button>
      ))}
    </div>
  );
}
```

## 总结

React是一个强大而灵活的库，用于构建用户界面。它的组件化思想、声明式编程方式和丰富的生态系统使其成为现代前端开发的重要工具。

通过掌握React的基础知识，你可以开始构建交互式的Web应用程序。随着对React的深入学习，你可以进一步探索更高级的主题，如Context API、Hooks的高级用法、性能优化技术等。

::: tip 未来计划
后续将更新更多React进阶内容，如：
- React Hooks深入解析
- React性能优化最佳实践
- React与TypeScript结合使用
- React测试策略
::: 