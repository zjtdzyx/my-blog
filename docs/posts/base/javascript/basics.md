# JavaScript基础知识

::: info
本文介绍JavaScript的基础知识，适合初学者阅读。
:::

## 变量声明

JavaScript中有三种变量声明方式：`var`、`let`和`const`。

### var

```javascript
var name = 'zyx';
var age = 25;
```

`var`声明的变量存在变量提升，且作用域为函数作用域，这可能导致一些意外的行为。

### let

```javascript
let name = 'zyx';
let age = 25;
```

`let`声明的变量不存在变量提升，作用域为块级作用域，更符合直觉和其他编程语言的习惯。

### const

```javascript
const PI = 3.14159;
const API_URL = 'https://api.example.com';
```

`const`声明的变量必须立即初始化，且初始化后不能再赋值，但如果是对象类型，其属性仍然可以修改。

## 数据类型

JavaScript有以下几种基本数据类型：

- **Number**: 数字类型，包括整数和浮点数
- **String**: 字符串类型
- **Boolean**: 布尔类型，值为`true`或`false`
- **Null**: 表示空值
- **Undefined**: 表示未定义
- **Symbol**: ES6引入的新类型，表示唯一的标识符
- **BigInt**: 用于表示大整数

还有一种复杂类型：

- **Object**: 对象类型，包括普通对象、数组、函数等

### 类型检查

可以使用`typeof`操作符检查变量的类型：

```javascript
typeof 42;              // 'number'
typeof 'Hello';         // 'string'
typeof true;            // 'boolean'
typeof undefined;       // 'undefined'
typeof null;            // 'object' (这是一个历史遗留的bug)
typeof Symbol();        // 'symbol'
typeof BigInt(42);      // 'bigint'
typeof {};              // 'object'
typeof [];              // 'object'
typeof function() {};   // 'function'
```

## 函数

JavaScript中的函数是一级公民，可以赋值给变量，作为参数传递，也可以作为返回值。

### 函数声明

```javascript
function add(a, b) {
  return a + b;
}
```

### 函数表达式

```javascript
const multiply = function(a, b) {
  return a * b;
};
```

### 箭头函数（ES6）

```javascript
const subtract = (a, b) => a - b;

const double = a => a * 2;

const greet = () => {
  console.log('Hello!');
  return 'Greeting completed';
};
```

箭头函数与普通函数的区别：
1. 更简洁的语法
2. 没有自己的`this`，`arguments`，`super`或`new.target`
3. 不能用作构造函数
4. 不适用于需要动态`this`的场景

## 对象

JavaScript中的对象是键值对的集合。

### 对象字面量

```javascript
const person = {
  name: 'zyx',
  age: 25,
  greet() {
    return `Hello, my name is ${this.name}`;
  }
};
```

### 访问对象属性

```javascript
// 点表示法
console.log(person.name);  // 'zyx'

// 括号表示法
console.log(person['age']); // 25
```

### 对象解构（ES6）

```javascript
const { name, age } = person;
console.log(name, age);  // 'zyx' 25
```

## 数组

数组是JavaScript中用于存储多个值的特殊对象。

### 数组字面量

```javascript
const fruits = ['Apple', 'Banana', 'Cherry'];
```

### 访问数组元素

```javascript
console.log(fruits[0]);  // 'Apple'
```

### 常用数组方法

```javascript
// 添加元素
fruits.push('Date');  // 末尾添加
fruits.unshift('Apricot');  // 开头添加

// 删除元素
fruits.pop();  // 删除末尾元素
fruits.shift();  // 删除开头元素

// 查找元素
const index = fruits.indexOf('Banana');  // 返回索引，如果不存在则返回-1

// 遍历数组
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});

// 映射数组
const upperFruits = fruits.map(fruit => fruit.toUpperCase());

// 过滤数组
const longFruits = fruits.filter(fruit => fruit.length > 5);

// 归约数组
const allFruits = fruits.reduce((acc, fruit) => acc + ', ' + fruit);
```

## 总结

JavaScript作为一门灵活的编程语言，提供了丰富的语言特性和API。通过掌握这些基础知识，你可以开始构建各种Web应用程序。在接下来的文章中，我们将深入探讨JavaScript的更多高级特性，如闭包、原型、异步编程等。

::: tip 未来计划
后续将更新更多JavaScript进阶内容，如：
- JavaScript闭包详解
- 原型和原型链
- 异步编程：Promise和async/await
- ES6+新特性全解析
::: 