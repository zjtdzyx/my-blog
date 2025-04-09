# TypeScript基础知识

::: info
本文介绍TypeScript的基础知识，适合有JavaScript基础的开发者阅读。
:::

## TypeScript简介

TypeScript是JavaScript的超集，它添加了类型系统和对ES6+特性的支持。TypeScript代码最终会被编译成JavaScript代码运行在浏览器或Node.js环境中。

### TypeScript的优势

1. **静态类型检查**：在编译时发现潜在的错误
2. **更好的IDE支持**：代码补全、接口提示、跳转到定义等
3. **更好的可维护性**：类型定义使代码更清晰，特别是在大型项目中
4. **更好的文档性**：类型本身就是代码的一种文档

## 基本类型

TypeScript提供了与JavaScript相同的基本类型，并添加了一些额外的类型。

```typescript
// 布尔类型
let isDone: boolean = false;

// 数字类型
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 字符串类型
let color: string = "blue";
let fullName: string = `Bob Bobbington`;

// 数组类型
let list: number[] = [1, 2, 3];
let fruits: Array<string> = ['Apple', 'Banana', 'Cherry'];

// 元组类型
let person: [string, number] = ['zyx', 25];

// 枚举类型
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Any类型
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// Void类型
function logMessage(): void {
  console.log('This is a message');
}

// Null和Undefined类型
let u: undefined = undefined;
let n: null = null;

// Never类型
function error(message: string): never {
  throw new Error(message);
}

// Object类型
let obj: object = {name: 'zyx'};
```

## 接口

TypeScript的接口定义了对象的结构，指定了对象应该具有的属性和方法。

```typescript
interface Person {
  name: string;
  age: number;
  email?: string; // 可选属性
  readonly id: number; // 只读属性
  greet(): string;
}

const user: Person = {
  name: 'zyx',
  age: 25,
  id: 1,
  greet() {
    return `Hello, my name is ${this.name}`;
  }
};
```

## 类

TypeScript支持基于类的面向对象编程，包括继承、访问修饰符等特性。

```typescript
class Animal {
  private name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  public move(distance: number = 0): void {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  
  bark(): void {
    console.log('Woof! Woof!');
  }
  
  move(distance: number = 5): void {
    console.log('Running...');
    super.move(distance);
  }
}

const dog = new Dog('Rex');
dog.bark();
dog.move(10);
```

## 函数

TypeScript允许为函数的参数和返回值指定类型。

```typescript
// 基本函数类型
function add(x: number, y: number): number {
  return x + y;
}

// 可选参数
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName;
}

// 默认参数
function greet(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}!`;
}

// 剩余参数
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// 函数类型
let myAdd: (x: number, y: number) => number;
myAdd = (x, y) => x + y;
```

## 泛型

泛型允许你创建可重用的组件，这些组件可以处理多种类型而不失去类型安全性。

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
let output2 = identity(42); // 类型推断为 number

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;
```

## 高级类型

TypeScript提供了多种高级类型，用于更复杂的类型操作。

```typescript
// 联合类型
let status: string | number;
status = "OK";
status = 200;

// 交叉类型
interface BusinessPartner {
  name: string;
  credit: number;
}

interface Identity {
  id: number;
  email: string;
}

type Employee = BusinessPartner & Identity;

// 类型别名
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

// 字面量类型
type Direction = 'North' | 'East' | 'South' | 'West';
let direction: Direction = 'North';

// 索引类型
interface Dictionary<T> {
  [key: string]: T;
}

let names: Dictionary<string> = {
  'a': 'Alice',
  'b': 'Bob'
};
```

## TypeScript与JavaScript的互操作性

TypeScript与JavaScript是完全兼容的，你可以在TypeScript项目中使用现有的JavaScript库和代码。

```typescript
// 使用声明文件 (.d.ts)
// example.d.ts
declare module 'my-library' {
  export function doSomething(): void;
}

// 在TypeScript中使用
import { doSomething } from 'my-library';
doSomething();
```

## TypeScript配置

TypeScript通过tsconfig.json文件进行配置，可以指定编译选项、包含/排除的文件等。

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

## 总结

TypeScript为JavaScript开发提供了更强大的工具，尤其是在大型项目中。通过静态类型检查和丰富的类型系统，TypeScript可以帮助你编写更可靠、更易维护的代码。学习TypeScript对于进阶前端开发是非常有价值的投资。

::: tip 未来计划
后续将更新更多TypeScript进阶内容，如：
- TypeScript装饰器详解
- 高级类型操作与类型体操
- TypeScript与现代框架的结合使用
- TypeScript工程实践与最佳实践
::: 