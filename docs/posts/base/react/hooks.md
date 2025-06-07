## react的基础hooks

咱们知道，React Hook 是 React 16.8 以后引入的，它让函数组件也能拥有状态（state）和其他 React 特性，彻底改变了我们写组件的方式，让代码更简洁、可读性更强。

#### 1. `useState`：给函数组件一个“记忆”

`useState` 绝对是你最常用的 Hook，它能让你的函数组件拥有自己的状态。想象一下，你写一个按钮，点击一下，按钮上的数字就变大，这个变化的数字就是组件的状态。

**最优范式解读：**

- **声明和初始化：** `useState` 返回一个数组，第一个是当前状态值，第二个是更新状态的函数。

  JavaScript

  ```
  import React, { useState } from 'react';
  
  function Counter() {
    // 声明一个名为 'count' 的状态变量，初始值为 0
    const [count, setCount] = useState(0);
  
    const increment = () => {
      // 使用更新函数来改变状态
      setCount(count + 1); // 这种方式在多次更新时可能会有问题
      // 更推荐的更新方式：使用函数式更新，确保拿到最新的state
      // setCount(prevCount => prevCount + 1);
    };
  
    return (
      <div>
        <p>你点击了 {count} 次</p>
        <button onClick={increment}>点击我</button>
      </div>
    );
  }
  ```

- **函数式更新：** 当你的新状态依赖于上一个状态时，强烈建议你传入一个函数给 `setCount`。这样可以避免闭包陷阱，确保拿到最新的状态值，尤其是在批量更新或者异步更新的场景下。

  JavaScript

  ```
  // 更好的做法：使用函数式更新
  setCount(prevCount => prevCount + 1);
  ```

- **状态的不可变性：** 记住，永远不要直接修改状态！`useState` 维护的是状态的副本，你需要通过 `set` 函数来更新它。比如，如果你有一个对象状态，想要更新其中的某个属性，你需要创建一个新的对象，然后传入新的对象。

  JavaScript

  ```
  const [user, setUser] = useState({ name: '张三', age: 20 });
  
  const updateAge = () => {
    // 错误示范：直接修改
    // user.age = 21;
    // setUser(user);
  
    // 正确做法：创建新对象并更新
    setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));
  };
  ```

#### 2. `useEffect`：处理副作用的“管家”

`useEffect` 让你在函数组件中执行副作用操作，比如数据获取、订阅事件、手动改变 DOM 等。可以把它想象成 Class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 的结合体。

**最优范式解读：**

- **清理函数：** 如果你的副作用需要清理（比如取消订阅、清除定时器），`useEffect` 允许你返回一个函数。这个返回的函数会在组件卸载时或者下次副作用执行前运行。

​    import React, { useState, useEffect } from 'react';



````
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    // 返回一个清理函数
    return () => {
      clearInterval(intervalId); // 组件卸载时或effect重新执行前清除定时器
    };
  }, []); // 空依赖数组表示只在组件挂载时执行一次（相当于 componentDidMount）

  return <div>计时器: {count}</div>;
}
```
````

- **依赖数组：** `useEffect` 的第二个参数是依赖数组。

  - **空数组 `[]`：** 表示只在组件挂载时执行一次，相当于 `componentDidMount`。这是处理一次性数据获取的常见方式。
  - **省略依赖数组：** 每次组件渲染都会执行（非常不推荐，容易造成无限循环或性能问题）。
  - **包含依赖项：** 只有当依赖项发生变化时，`useEffect` 才会重新执行。这是优化性能的关键。

  JavaScript

  ```
  // 当 userId 变化时才重新获取用户数据
  useEffect(() => {
    // fetchData(userId);
  }, [userId]);
  ```

  **陷阱与规避：** 如果你发现 `useEffect` 在无限循环或者行为异常，通常是因为依赖数组没有正确设置，或者在 `useEffect` 内部创建了会引起循环的函数或对象。

- **分离关注点：** 如果你有多个不相关的副作用，可以声明多个 `useEffect` Hook。这比在一个 `useEffect` 里处理所有事情更清晰。

#### 3. `useContext`：解决组件层级传递问题的“直通车”

`useContext` 可以让你订阅 React Context，避免了逐层传递 `props` 的“`prop drilling`”问题。它提供了一种在组件树中共享数据的方式，比如主题、用户认证信息等。

**最优范式解读：**

- **创建 Context：** 首先你需要创建一个 Context。

  JavaScript

  ```
  // theme-context.js
  import React from 'react';
  export const ThemeContext = React.createContext('light'); // 默认值
  ```

- **提供 Context：** 在父组件中使用 `Context.Provider` 包裹需要访问这个 Context 的子组件，并通过 `value` prop 提供数据。

  JavaScript

  ```
  // App.js
  import React from 'react';
  import { ThemeContext } from './theme-context';
  import Toolbar from './Toolbar';
  
  function App() {
    return (
      <ThemeContext.Provider value="dark"> {/* 提供 'dark' 主题 */}
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
  ```

- **消费 Context：** 在子组件中使用 `useContext` Hook 来获取 Context 的值。

  JavaScript

  ```
  // Toolbar.js
  import React, { useContext } from 'react';
  import ThemedButton from './ThemedButton';
  import { ThemeContext } from './theme-context'; // 引入Context
  
  function Toolbar() {
    const theme = useContext(ThemeContext); // 获取Context的值
    return (
      <div style={{ background: theme === 'dark' ? '#333' : '#eee', color: theme === 'dark' ? '#fff' : '#000' }}>
        <p>当前主题: {theme}</p>
        <ThemedButton />
      </div>
    );
  }
  ```

#### 4. `useRef`：获取 DOM 元素或在渲染间共享可变值

`useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。返回的 ref 对象在组件的整个生命周期内保持不变。它有两个主要用途：

- **访问 DOM 元素：** 这是最常见的用途，可以让你直接操作 DOM（比如获取 input 焦点）。
- **存储可变值：** 在多次渲染之间共享可变值，而不会引起组件重新渲染（不像 `useState`）。

**最优范式解读：**

- **访问 DOM：**

  JavaScript

  ```
  import React, { useRef, useEffect } from 'react';
  
  function MyInput() {
    const inputRef = useRef(null); // 创建一个 ref
  
    useEffect(() => {
      // 组件挂载后，ref.current 指向真实的 DOM 节点
      if (inputRef.current) {
        inputRef.current.focus(); // 让 input 自动获取焦点
      }
    }, []); // 只在组件挂载时执行一次
  
    return <input ref={inputRef} type="text" />; // 将 ref 绑定到 DOM 元素
  }
  ```

- **存储可变值：** 比如，你想在组件渲染时不触发重新渲染的情况下存储一个 ID。

  JavaScript

  ```
  import React, { useRef, useState } from 'react';
  
  function CountRender() {
    const [count, setCount] = useState(0);
    const renderCount = useRef(0); // 创建一个 ref 来记录渲染次数
  
    // renderCount.current 的变化不会引起组件重新渲染
    renderCount.current = renderCount.current + 1;
  
    return (
      <div>
        <p>点击次数: {count}</p>
        <p>组件渲染次数: {renderCount.current}</p>
        <button onClick={() => setCount(count + 1)}>增加点击</button>
      </div>
    );
  }
  ```

#### 5. `useCallback` 和 `useMemo`：性能优化的“利器”

这两个 Hook 都是用来优化性能的，避免不必要的重新计算和渲染，但它们优化的对象不同。

**最优范式解读：**

- useCallback：记住函数

  useCallback 返回一个 memoized（缓存的）回调函数。只有当它的依赖项发生变化时，它才会返回一个新的函数。这在将回调函数作为 props 传递给子组件时非常有用，可以防止子组件不必要的重新渲染（尤其是当子组件使用了 React.memo 时）。

  JavaScript

  ```
  import React, { useState, useCallback, memo } from 'react';
  
  // 子组件，使用了 memo 优化，只有当 props 改变时才重新渲染
  const MyButton = memo(({ onClick, text }) => {
    console.log('MyButton rendered');
    return <button onClick={onClick}>{text}</button>;
  });
  
  function ParentComponent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('张三');
  
    // 只有当 count 变化时，这个函数才会重新创建
    const handleClick = useCallback(() => {
      setCount(prevCount => prevCount + 1);
    }, [count]); // 依赖 count
  
    // 这个函数每次渲染都会重新创建
    const handleOtherClick = () => {
      console.log('Other click');
    };
  
    return (
      <div>
        <p>Count: {count}</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {/* 当 ParentComponent 重新渲染时，如果 name 改变了，handleClick 不会重新创建 */}
        <MyButton onClick={handleClick} text="点击我" />
        {/* 每次 ParentComponent 重新渲染，handleOtherClick 都会重新创建，可能导致 MyButton 重新渲染 */}
        {/* <MyButton onClick={handleOtherClick} text="另一个按钮" /> */}
      </div>
    );
  }
  ```

  **使用场景：** 当你的函数作为 props 传递给经过 `React.memo` 优化的子组件时。

- useMemo：记住值

  useMemo 返回一个 memoized（缓存的）值。只有当它的依赖项发生变化时，它才会重新计算这个值。这对于执行昂贵计算的函数非常有用，可以避免在每次渲染时都重新计算。

  JavaScript

  ```
  import React, { useState, useMemo } from 'react';
  
  function ExpensiveCalculationComponent({ num }) {
    // 模拟一个耗时的计算
    const expensiveValue = useMemo(() => {
      console.log('Performing expensive calculation...');
      let result = 0;
      for (let i = 0; i < num * 100000000; i++) { // 模拟大量计算
        result += i;
      }
      return result;
    }, [num]); // 只有当 num 变化时才重新计算
  
    return (
      <div>
        <p>传入的数字: {num}</p>
        <p>昂贵计算结果: {expensiveValue}</p>
      </div>
    );
  }
  
  function App() {
    const [count, setCount] = useState(0);
    const [inputNum, setInputNum] = useState(1);
  
    return (
      <div>
        <button onClick={() => setCount(count + 1)}>增加计数 ({count})</button>
        <input
          type="number"
          value={inputNum}
          onChange={(e) => setInputNum(parseInt(e.target.value))}
        />
        {/* 只有当 inputNum 变化时，ExpensiveCalculationComponent 内部的昂贵计算才会重新执行 */}
        <ExpensiveCalculationComponent num={inputNum} />
      </div>
    );
  }
  ```

  **使用场景：** 当你的组件需要渲染一个计算成本很高的数据时，或者当一个值作为 props 传递给经过 `React.memo` 优化的子组件时。

关于 useCallback 和 useMemo 的忠告：

不要过度优化！只有当你真正遇到了性能瓶颈时才考虑使用它们。过多的 useCallback 和 useMemo 反而会增加代码的复杂性，并且它们本身也有一定的开销。通常，先用好 useEffect 的依赖数组，再考虑这两个。

#### 总结与感悟

学习 React Hook 就像是学习一套新的武功秘籍，掌握了它们，你就能更优雅、更高效地编写 React 组件。

- **`useState`** 是状态管理的基石。
- **`useEffect`** 是处理各种副作用的瑞士军刀，但要警惕依赖数组的坑。
- **`useContext`** 是跨组件传递数据的利器。
- **`useRef`** 让你能直接操作 DOM 或存储可变值。
- **`useCallback` 和 `useMemo`** 是性能优化的杀手锏，但要慎用。

在面试中，除了知道它们怎么用，更重要的是能讲清楚为什么要用它们，以及它们在不同场景下的最优实践。多思考一下这些 Hook 背后的原理，它们帮你解决了什么问题，以及在什么情况下使用它们能让你的代码更健壮、更高效。