# 1.什么是JavaScript

## 1.ECMAScript

## 2.DOM

## 3.BOM

# 2.HTML中的JavaScript

## 1.\<script\>元素

1. acync：立即下载脚本，不能阻止其他页面操作（异步），不能保证按次序执行
2. charset
3. chrossorigin
4. defer：立即下载，延迟执行，只对外部脚本有效
5. integrity
6. language
7. src：要包含外部 JavaScript，就必须使用 src，此时 \<script\> 不再包含其他代码
8. type

通常将所有JavaScript 引用放在 \<body> 元素中的页面内容后面

## 2.\<noscript>元素

以下满足任何一个条件，包含在 \<noscript> 中的内容就会被渲染

1. 浏览器不支持脚本
2. 浏览器对脚本的支持关闭

# 3.语言基础

## 1.语法

1. 一切都区分大小写
2. 标志符：第一个字符必须是字母、下划线（_）、美元符号（$）
3. 注释： //、/*  */
4. 严格模式："use strict"；可以单独指定函数体
5. 语句：以分号结尾

## 2.关键字与保留字

## 3.变量

可以保存任何类型的数据

1. var：声明的变量会自动提升到函数作用域顶部
2. let：先使用后声明会有暂时性死区
3. const： 声明变量时必须同时初始化

- let 声明的是块作用域，var 声明的是函数作用域；

- 块作用域是函数作用域的子集；

- let 声明之前的执行瞬间被称为“暂时性死区”；

- let 在全局作用域中声明的变量不会成为 window 对象的属性，var 则会

- const 声明的限制只适用于变量的地址（内容太可以改变，地址不可以）

```js
    for (var i = 0; i < 5; i++) {
      setTimeout(() => {
        console.log(i);
      }, 0)
    }   // 5, 5, 5, 5, 5
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        console.log(i);
      }, 0)
    }     // 0, 1, 2, 3, 4
```

声明风格：尽量不使用 var，const 优先，let 次之

## 4.数据类型

简单数据类型：Undefined，Null，String，Number，Boolean，Symbol

复杂数据类型：Object

1. typeof
2. Undefined：任何未经初始化的变量都会取得 undefined 值
3. Null：null 值表示一个空对象指针
4. Boolean：
5. Number：存储浮点值使用的内存空间是存储整数值的两倍
   - Number.MIN_VALUE
   - Number.MAX_VALUE
   - isFinite(
   - NaN：任何涉及 NaN 的操作始终返回 NaN，isNaN()
   - Nnmber()、parseInt()、parseFloat()
6. String：toString()
   - 模板字符串：\` ${}`、标签函数
   - null 和 undefined 没有 toString() 方法
7. Symbol：
8. Object：

## 5.操作符

1. 一元操作符：+、-、++、--
2. 位操作符
3. 布尔操作符：!、&&、||
4. 乘性操作符：*、/、%
5. 指数操作符：Math.pow()：**
6. =、==、===、!=、!==
7. 条件操作符：? :

## 6.语句

1. if、if-else
2. do-while
3. while
4. for：无法通过while实现的逻辑，同样也无法使用for循环实现
5. for-in：属性名（索引），一般用于对象
6. for-of：属性值，一般用于数组
7. 标签语句
8. break 和 continue
9. with 语句
10. switch 语句：在与条件比较时使用全等操作符（===）

## 7.函数

# 4.变量、作用域与内存

## 1.原始值与引用值

原始值就是简单的数据（简单数据类型），引用值是有多个值构成的对象（复杂类型）

保存原始值的变量是**按值**引用的，因为操作的是存储在变量中的实际值；操作对象时，实际上操作的是该对象的引用，所以保存引用值的变量是**按引用**访问的

1. 动态属性
2. 复制值
3. 传递参数：ECAScript 中所用函数的参数都是按值传递的
4. 确定类型：instanceof（Object.prototype.toString.call()）

## 2.执行上下文与作用域

执行上下文也可以称为作用域

上下文中的代码在执行的时候，会创建变量对象的一个**作用域链**，这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序

上下文之间的连接是线性的、有序的

每个上下文都可以到上一级上下文中去搜索变量和函数，但任何上下文都不能到下一级上下文中去搜索

1. 作用域链增强

2. 变量声明

   Object.freeze()：对象不可修改

   - var
   - let
   - const
   - 标志符查找

## 3.垃圾回收

确定哪个变量不会再使用，然后释放它占用的内存

1. 标记清理

2. 引用计数

3. 性能

4. 内存管理

   解除对一个值的引用并不会自动导致相关内存被回收；解除引用的关键在于确保相关的值已经不再上下文里了，因此它在下次垃圾回收是会被回收

   - 通过 const 和 let 声明提升性能
   - 隐藏类和删除操作：避免 js 的“先创建再补充”式的动态属性赋值，并在构造函数中一次性声明所有函数；把不想要的属性设置为 null
   - 内存泄漏：意外声明全局变量；定时器；使用闭包
   - 静态分配与对象池

# 5.基本引用类型

## 1.Date

## 2.RegExp

​	exec()

​	test()

​	RegExp构造函数属性

## 3.原始值包装类型

```js
let s1 = "some text";
let s2 = s1.substring(2);
```

当第二行访问 s1 时，是以读模式访问的，也就是要从内存中读取变量保存的值。在以读模式访问字符串值的任何时候，后台都会执行以下三步：

1. 创建一个 String 类型的实例；
2. 调用实例上的特定方法；
3. 销毁实例。

可以把这3步想象成执行了如下3行 ECMAScript 代码：

```js
let s1 = new String("some text");
let s2 = s1.substring(2);
s1 = null;
```

这种行为可以让原始值拥有对象的行为，对布尔值和数值而言，以上三步也会在后台发生，只不过使用的是 Boolean 和 Number 包装类型而已。

1. Boolean

2. Number

   - toFixed()：返回包含指定小数点位数的数值字符串
   - toExponential()：返回以科学计数法表示的数值字符串
   - toPrecision()：根据情况，返回最合理的结果
   - Number.isInteger()：辨别一个数值是否保存为整数

3. String

   - length：字符串中字符的数量
   - chatAt()：返回给定索引位置的字符

   1. 字符串操作方法

      - concat()：将一个或多个字符串拼接成一个新字符串
      - slice()、substr()、substring()

      concat()、slice()、substr()、substring()不会修改原字符串

   2. 字符串位置方法

      - indexOf()
      - lastindexOf()

   3. 字符串包含方法

      - startsWith()
      - endsWith()
      - includes()

   4. trim()方法

   5. repeat()方法

      接受一个整数参数，表示要将字符串复制多次，然后返回拼接所有副本后的结果

   6. padStart()方法的padEnd()方法

      复制字符串

      ```js
      let str = "hellow";
      console.log(str.padStart(10));    // "    hellow"
      console.log(str.padStart(10, "哈喽"));    // "哈喽哈喽hellow"
      console.log(str.padEnd(10));    // "hellow    "
      console.log(str.padEnd(10, "你好啊"));    // "hellow你好啊你"
      ```

   7. 字符串迭代与解构

   8. 字符串大小写转换

      - toLowerCase()
      - toUpperCase()
      - toLocalLowerCase()
      - toLocalUpperCase()

   9. 字符串模式匹配与方法

      - match()
      - search()
      - replace()
      - split()

   10. localeCompare()方法

## 4.单例内置对象

- eval()方法
- Math

# 6.集合引用类型

## 1.Object

- 在使用对象字面量表示法定一对象时，并不会实际调用 Object 构造函数

- 可以使用中括号来存取属性，在使用中括号时，要在括号内使用属性名的字符串形式，使用中括号的主要优势是可以通过变量访问属性

## 2.Array

- 创建数组

  使用 Array 构造函数创建数组时，可以省略 new

  与对象一样，在使用数组字面量表示法创建数组不会调用 Array 构造函数

  from() 用于将类数组结构转换为数组实例，而 of() 用于将一组参数转换为数组实例；Array.from() 对现有数组执行浅复制（经过测验，可以对数组进行深拷贝）；

- 避免使用数组空位，如果确实需要，可以使用 undefined 值代替

- 通过修改 length 属性，可以从数组末尾删除或添加元素

- Array.isArray()

- 迭代器方法：

  - keys()：返回数组索引
  - values()：返回数组元素
  - entries()：返回索引 / 值对

- copyWithin()、fill()

- join()

- push()、pop()

- shift()、unshift()

- reverse()、sort()（sort() 可以用于数组排序）

- concat()、slice()、splice()

- indexOf()、lastIndexOf()、includes()

- find()、findIndex()

- 迭代方法

  - every()
  - filter()
  - forEach()
  - map()
  - some()

  这些方法都不改变调用他们的数组

- 归并方法

  - reduce()
  - reduceRight()

## 3.定型数组

## 4.Map

Map 和 Object 极其类似，功能较强

## 5.WealMap

## 6.Set

...new Set() 可以数组去重

## 7.WeakSet

# 7.迭代器与生成器

## 1.理解迭代

## 2.迭代器模式

## 3.生成器

# 8.对象、类与面向对象编程

## 1.理解对象

- 属性的类型

  为了将某个特性表示为内部特性，规范会用两个中括号把特性的名称括起来

  1. 数据属性

     - [[Configurable]]
     - [[Enumerable]]
     - [[Writable]]
     - [[Value]]

     Object.defineProperty()

  2. 访问器属性

     - [[Configurable]]
     - [[Enumerable]]
     - [[Get]]
     - [[Set]]

- Object.defineProperties()

- Object.getOwnPropertyDescriptor()

- Object.assign()

- Object.is()

- 对象解构

  null 和 undefined 不能被解构

## 2.创建对象

- 工厂函数

- 构造函数模式

  构造函数与普通函数唯一的区别就是调用方式不同；任何函数只要使用 new 操作符就是构造函数，而不使用 new 操作符调用的函数就是普通函数

- 原型模式

  1. isPrototypeOf()
  2. Object.getPrototypeOf()
  3. Object.setPrototypeOf()：可能会严重影响代码性能
  4. Object.create()
  5. hasOwnProperty()
  6. in 操作符
  7. Object.keys()
  8. Object.getOwmPropertyNames()
  9. Object.getOwnPropertySymbols()
  10. Object.values、Object.entries()
  11. 实例只有指向原型的指针，没有指向构造函数的指针

## 3.继承

默认情况下，所有引用类型都继承自 Object

- 盗用构造函数
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生式组合继承：引用类型继承的最佳模式

## 4.类

函数声明可以提升，类定义不行；类是一种特殊函数

函数受函数作用域限制，类受块作用域限制

- 类构造函数：不定义构造函数相当于将构造函数定义为空函数

  使用 new 调用类的构造函数会执行如下操作

  1. 在内存中创建一个新对象
  2. 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数的 prototype 属性
  3. 构造函数内部的 this 被赋值为这个新对象（即 this 指新对象）
  4. 执行构造函数内部的代码（给新对象添加属性）
  5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象

  类实例化时传入的参数会用作构造函数的参数

- 继承

  extends、super()

# 9.代理与反射

## 1.代理基础

## 2.代理捕获器与反射方法

## 3.代理模式

# 10.函数

## 1.箭头函数

箭头函数不能使用 arguments、super 和 new.target，也不能用作构造函数，箭头函数也没有 prototype 属性

## 2.函数名

所有函数对象都会暴露一个只读的 name 属性

## 3.理解参数

- arguments：类数组

  传入的参数会成为 arguments 的一个数据

  arguments 对象长度是根据传入的参数

- 箭头函数中的参数

## 4.没有重载

## 5.默认参数值

给参数传 undefined 相当于没有传值

arguments 对象的值不反应参数（形参）的默认值，只反映传给函数的参数

- 默认参数作用域与暂时性死区

## 6.参数扩展与收集

- 扩展参数

- 收集参数

  收集的参数会是一个 Array 实例

## 7.函数声明与函数表达式

## 8.函数作为值

## 9.函数内部

- arguments

  arguments.callee：严格模式会报错

- this

- caller

- new.target

  如果函数是正常调用的，则 new.target 的值是 undefined；如果是使用 new 关键字调用的，则 new.target 将引用被调用的构造函数

## 10.函数属性与方法

apply()、call()

## 11.函数表达式

## 12.递归

## 13.尾调用优化

## 14.闭包

**引用了另一个函数作用域中变量的函数**

- this 对象
- 内存泄漏

## 15.立即调用的函数表达式

## 16.私有变量

- 静态私有变量
- 模块模式模块增强模式

# 11.期约与异步函数

## 1.异步编程

## 2.期约

期约（promise）是对尚不存在结果的一个替身

- pending

- fulfilled、resolved

- rejected

- Promise.resolve()

  ```js
  // 等价
  let p1 = new Promise((resolve, reject) => resolve());
  let p2 = Promise.resolve();
  ```

- Promise.reject()

  ```js
  // 等价
  let p1 = new Promise((resolve, reject) => reject());
  let p2 = Promise.reject();
  ```

## 3.异步函数

async、await

# 12.BOM

## 1.window对象

通过 var 声明的所有全局变量和函数都会变成 window 对象的属性和方法

定时器：setTimeout()、setInterval()

## 2.location对象

location 既是 window 的属性，也是 document 的属性

## 3.navigator对象

## 4.screen对象

## 5.history对象

# 13.客户端检测

## 1.能力监测

## 2.用户代理检测

## 3.软件与硬件检测

# 14.DOM

## 1.节点层级

## 2.DOM编程

## 3.MutationObserver接口

# 15.DOM扩展

## 1.Selectors API

## 2.元素遍历

## 3.HTML5

## 4.专有扩展

# 16.DOM2和DOM3

## 1.DOM的演进

## 2.样式

## 3.遍历

## 4.范围

# 17.事件

## 1.事件流

## 2.事件处理程序

## 3.事件对象

## 4.事件类型

## 5.内存与性能

## 6.模拟事件

# 18.动画与Canvas图形

## 1.使用requestAnimationFrame

## 2.基本的画布功能

## 3.2D绘图上下文

## 4.WebGL

# 19.表单脚本

## 1.表单基础

## 2.文本框编程

## 3.选择框编程

## 4.表单序列化

## 5.富文本编辑器



