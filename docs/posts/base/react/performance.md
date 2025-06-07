## react应用程序的常见性能优化策略

React 的性能优化，核心思想就是：**减少不必要的渲染，减少计算量。**

#### 1. 组件渲染优化：只在必要时更新

这是 React 性能优化的重中之重，也是最直接能看到效果的。

- **`React.memo`（针对函数组件）：**

  - **作用：** 如果你的函数组件在给定相同的 `props` 的情况下渲染结果相同，你可以使用 `React.memo` 包裹它。这样，React 将跳过渲染该组件的操作，并复用最近一次渲染的结果。

  - 最优范式：

    JavaScript

    ```
    import React, { memo } from 'react';
    
    // 只有当 props.name 或 props.age 变化时，UserDisplay 才会重新渲染
    const UserDisplay = memo(({ name, age }) => {
      console.log('UserDisplay rendered');
      return (
        <div>
          <p>姓名: {name}</p>
          <p>年龄: {age}</p>
        </div>
      );
    });
    
    function ParentComponent() {
      const [count, setCount] = useState(0);
      const user = { name: '张三', age: 25 }; // 假设这里user对象每次渲染都会重新创建
    
      return (
        <div>
          <button onClick={() => setCount(count + 1)}>Count: {count}</button>
          {/* 即使 ParentComponent 重新渲染，如果 user.name 和 user.age 没变，UserDisplay 也不会渲染 */}
          <UserDisplay name={user.name} age={user.age} />
        </div>
      );
    }
    ```

  - **注意：** 如果 `props` 中包含函数或对象，每次父组件渲染时，这些函数或对象都会是新的引用，即使其内容未变，也会导致 `memo` 失效。这时就需要结合 `useCallback` 或 `useMemo`。

- **`PureComponent`（针对 Class 组件）：**

  - **作用：** 与 `React.memo` 类似，`PureComponent` 会对 `props` 和 `state` 进行浅比较。如果 `props` 或 `state` 没有发生变化，则组件不会重新渲染。

  - 最优范式：

    JavaScript

    ```
    import React, { PureComponent } from 'react';
    
    class MyPureComponent extends PureComponent {
      render() {
        console.log('MyPureComponent rendered');
        return <div>{this.props.value}</div>;
      }
    }
    ```

  - **局限性：** 同样，如果 `props` 或 `state` 包含引用类型（对象、数组、函数），浅比较可能不符合预期，导致不必要的渲染或该渲染却不渲染的问题。

- **`shouldComponentUpdate`（针对 Class 组件，高级用法）：**

  - **作用：** 这是一个生命周期方法，你可以手动控制 Class 组件何时重新渲染。它接收 `nextProps` 和 `nextState` 作为参数，如果你返回 `false`，组件将不会重新渲染。

  - 最优范式：

    JavaScript

    ```
    class MyCustomComponent extends React.Component {
      shouldComponentUpdate(nextProps, nextState) {
        // 只有当 prop.id 发生变化时才重新渲染
        return nextProps.id !== this.props.id;
      }
    
      render() {
        console.log('MyCustomComponent rendered');
        return <div>ID: {this.props.id}</div>;
      }
    }
    ```

  - **注意：** 实现 `shouldComponentUpdate` 需要非常小心，手动实现浅比较或深比较都有其复杂性，容易引入 bug。通常推荐使用 `PureComponent` 或 `React.memo`。

#### 2. 数据处理与计算优化：避免重复计算

- **`useMemo`：缓存计算结果**

  - **作用：** 用于缓存计算结果。只有当 `useMemo` 的依赖项发生变化时，它才会重新计算并返回新的值。

  - 最优范式：

     避免在每次渲染时都执行昂贵的计算。

    JavaScript

    ```
    import React, { useState, useMemo } from 'react';
    
    function UserList({ users, filterText }) {
      // 只有当 users 或 filterText 变化时，filteredUsers 才会重新计算
      const filteredUsers = useMemo(() => {
        console.log('Filtering users...');
        return users.filter(user => user.name.includes(filterText));
      }, [users, filterText]);
    
      return (
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      );
    }
    ```

- **`useCallback`：缓存函数引用**

  - **作用：** 用于缓存函数引用。只有当 `useCallback` 的依赖项发生变化时，它才会返回一个新的函数引用。

  - 最优范式：

     结合 

    ```
    React.memo
    ```

     或 

    ```
    PureComponent
    ```

     使用，防止子组件因为父组件重新渲染而导致函数 prop 引用变化，从而引发不必要的重新渲染。

    JavaScript

    ```
    import React, { useState, useCallback, memo } from 'react';
    
    const MyButton = memo(({ onClick, label }) => {
      console.log('Button rendered');
      return <button onClick={onClick}>{label}</button>;
    });
    
    function ParentComponent() {
      const [count, setCount] = useState(0);
    
      // 只有当 count 变化时，handleClick 才会是新的函数引用
      const handleClick = useCallback(() => {
        setCount(prevCount => prevCount + 1);
      }, [count]); // 依赖 count
    
      return (
        <div>
          <p>Count: {count}</p>
          {/* 即使 ParentComponent 重新渲染，如果 handleClick 引用没变，MyButton 也不会重新渲染 */}
          <MyButton onClick={handleClick} label="Increment Count" />
        </div>
      );
    }
    ```

#### 3. 虚拟 DOM 优化：批处理与键（Keys）

- **批处理更新（Batching Updates）：**

  - **原理：** React 18 默认支持自动批处理更新。这意味着，在一次事件循环中（例如，在一个事件处理器内部），即使你多次调用 `setState`，React 也会将这些更新合并成一次，只进行一次重新渲染。这大大减少了不必要的渲染次数。
  - **了解即可：** 在 React 18 之前，只有在 React 事件处理器中的更新才会被批处理。现在，无论更新来自哪里（事件处理器、`Promises`、`setTimeout` 等），都会默认进行批处理，大大简化了性能优化。

- **列表渲染的 `key` prop：**

  - **作用：** 当渲染列表时，为每个列表项提供一个稳定、唯一的 `key` 值至关重要。`key` 帮助 React 识别哪些项发生了变化、被添加或被删除，从而高效地更新虚拟 DOM。

  - 最优范式：

     使用数据项本身的唯一 ID 作为 

    ```
    key
    ```

    。

    JavaScript

    ```
    function ItemList({ items }) {
      return (
        <ul>
          {items.map(item => (
            // item.id 应该是唯一且稳定的
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      );
    }
    ```

  - **禁忌：** 绝对不要使用数组索引 `index` 作为 `key`，除非你的列表是静态的、永不改变顺序且不会增删项。否则会导致渲染错误和性能问题。

#### 4. 代码分割（Code Splitting）与懒加载（Lazy Loading）：减小打包体积

- **作用：** 将应用代码分割成更小的块，按需加载，而不是一次性加载所有代码。这可以显著减少首次加载时间。

- **核心 API：** `React.lazy` 和 `Suspense`。

- 最优范式：

  JavaScript

  ```
  import React, { lazy, Suspense } from 'react';
  
  // 使用 React.lazy 动态导入组件
  const AboutPage = lazy(() => import('./AboutPage'));
  const ContactPage = lazy(() => import('./ContactPage'));
  
  function App() {
    return (
      <div>
        <h1>My App</h1>
        {/* 使用 Suspense 包裹懒加载的组件，提供加载状态 */}
        <Suspense fallback={<div>Loading...</div>}>
          <AboutPage />
          <ContactPage />
        </Suspense>
      </div>
    );
  }
  ```

- **应用场景：** 路由级别组件懒加载、大型模块按需加载。

#### 5. 图片优化：减少资源加载时间

- **图片压缩：** 使用工具压缩图片大小。
- **图片懒加载：** 使用 `loading="lazy"` 属性或第三方库，只加载进入视口的图片。
- **响应式图片：** 使用 `srcset` 和 `<picture>` 标签根据设备屏幕大小加载不同尺寸的图片。
- **WebP/AVIF 格式：** 优先使用这些新一代图片格式，它们通常具有更好的压缩率。

#### 6. 避免不必要的组件层级：简化 DOM 结构

- **作用：** 减少组件的嵌套层级和 DOM 节点的数量可以减少渲染和更新的开销。

- 范式：

   使用 

  ```
  React.Fragment
  ```

   或简写 

  ```
  <></>
  ```

   代替多余的 

  ```
  div
  ```

  。

  JavaScript

  ```
  // 之前
  function MyComponent() {
    return (
      <div>
        <ChildA />
        <ChildB />
      </div>
    );
  }
  
  // 之后
  function MyComponent() {
    return (
      <> {/* 或者 <React.Fragment> */}
        <ChildA />
        <ChildB />
      </>
    );
  }
  ```

#### 7. 使用 CDN：加速静态资源加载

- 将 React 库、React DOM 库以及其他第三方库部署到 CDN 上，利用 CDN 的全球分布式网络加速资源加载。

#### 8. 服务端渲染 (SSR) / 静态站点生成 (SSG)：提升首屏加载速度和 SEO

- **作用：** 在服务器端预先渲染 React 组件，直接返回 HTML 给浏览器，减少了客户端渲染的时间，提升了首屏加载速度和搜索引擎优化（SEO）。
- **常用框架：** Next.js、Gatsby。

#### 9. 性能分析工具：定位瓶颈

- **React Developer Tools Profiler：** 这是 React 官方提供的强大工具，可以在浏览器开发者工具中分析组件的渲染时间、更新原因等，帮你找到性能瓶颈。
- **Lighthouse：** Chrome 浏览器内置的审计工具，可以评估网页的性能、可访问性、最佳实践和 SEO 等。

### 总结与面试建议

React 性能优化是一个持续的过程，没有一劳永逸的解决方案。在面试中，除了列举这些手段，更重要的是展现你对性能优化的**思考方式**和**实际解决问题的能力**：

1. **分层理解：** 从组件渲染、数据处理、代码加载等不同层面去思考优化。
2. **核心原则：** 记住“减少不必要的渲染，减少计算量”。
3. **何时优化：** 强调**不要过早优化**！先完成功能，再用分析工具定位瓶颈，有针对性地优化。过度优化反而会增加代码复杂性，降低可维护性。
4. **Hands-on 经验：** 如果有实际项目中的优化经验，那是最好的加分项。比如你用 `React.memo` 解决了某个列表的性能问题，或者通过代码分割减少了首屏加载时间。

