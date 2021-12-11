## Object.prototype.toString.call() 判断数据类型

```js
var toString = Object.prototype.toString;
console.log(toString.call(1));                      //[object Number]
console.log(toString.call(true));                   //[object Boolean]
console.log(toString.call('mc'));                   //[object String]
console.log(toString.call([]));                     //[object Array]
console.log(toString.call({}));                     //[object Object]
console.log(toString.call(function(){}));           //[object Function]
console.log(toString.call(undefined));              //[object Undefined]
console.log(toString.call(null));                   //[object Null]
```

## ...new Set()数组去重

```js
console.log(...new Set([1, 2, 3, 4, 2, 1]));    // 1 2 3 4
```

## 闭包

闭包是指有权访问另一个函数作用域中的变量的函数

内部函数没有执行完成，外部函数变量不会被销毁

## css三角形

```js
/*记忆口诀：盒子宽高均为零，三面边框皆透明。 */
div:after{
    position: absolute;
    width: 0px;
    height: 0px;
    content: " ";
    border-right: 100px solid transparent;
    border-top: 100px solid #ff0;
    border-left: 100px solid transparent;
    border-bottom: 100px solid transparent;
}
```

## 深拷贝

```js
function cloneDeep (target) {
    // 判断是否传入类型为Object
    if (typeof target !== 'object' || !target) {
        return target;
    }
    // 声明新对象
    let newTarget = target instanceof Array === true ? [] : {};
    // 循环对象 递归复制给新对象
    for (let key in target) {
        // 判断属性是否在对象本身上
        if (target.hasOwnProperty(key)) {
            // 递归调用
            newTarget[key] = cloneDeep(target[key]);
        }
    }
    // 返回新对象
    return newTarget;
}

function deepClone(obj) {
  if (typeof obj !== 'object') {
    return obj
  }

  let newObj = obj instanceof Array ? [] : {};
  for(let k in obj) {
    if(typeof k === 'object') {
      deepClone(obj[k])
    }else {
      newObj[k] = obj[k]
    }
  }
  return newObj
}

Array.from()	// 只针对数组
let obj2 = {...obj1}
```

## 浅拷贝

```js
Object.assign(target,source)

// 展开语法
let newObj = {...obj}
```

## 防抖

```js
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
```

## 节流

```js
function throttle(fn,wait){
    let pre = 0;
    return function(...args){
        let now = Date.now();
        if( now - pre >= wait){
            fn.apply(this,args);
            pre = now;
        }
    }
}

function throttle(fn, wait) {
  let flag = true;
  return function() {
    if(flag) {
      setTimeout(() => {
        fn.call(this);
        flag = true;
      }, wait)
      flag = false;
    }
  }
}
```

## 解构赋值可以进行数据交换

```js
let a = 10, b = 20;
[a, b] = [b, a];
```

## 冻结变量

```js
Object.freeze()
```

## Boolean

转换为布尔类型，两次取反（Boolean也可以）

1. 首先先转换为布尔类型，再取反
2. 再进行取反，获得原来值

## for循环

for 循环时基础类型会复制一份，引用类型是原地址

## this

普通函数 this 指向 window，箭头函数 this 指向上下文（父级作用域 this）

## vue中data

在Vue开发中，会有一些数据，从始至终都`未曾改变过`，这种`死数据`，既然`不改变`，那也就`不需要对他做响应式处理`了，不然只会做一些无用功消耗性能，比如一些写死的下拉框，写死的表格数据，这些数据量大的`死数据`，如果都进行响应式处理，那会消耗大量性能

```js
// 方法一：将数据定义在data之外
data () {
    this.list1 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    this.list2 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    this.list3 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    this.list4 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    this.list5 = { xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx }
    return {}
}
    
// 方法二：Object.freeze()
data () {
    return {
        list1: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
        list2: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
        list3: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
        list4: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
        list5: Object.freeze({xxxxxxxxxxxxxxxxxxxxxxxx}),
    }
}
```

## react调用

`react` 中调用尽量不要加`()`，否则开始时自己会调用一次

加括号是把函数的返回值作为`onChange`回调，不加是把函数作为`onChange`的回调

## 对象相关：

1. 中括号`[]`包裹属性名时，属性名可以为变量

## 折叠

当一部分不可折叠时

`//#region`

`//#endregion`

## class类

添加的数据都在class实例对象自身，在 constructor 上添加的函数在 class 实例自身，没在 constructor  上定义的函数在实例的原型上

```js
class User {
  constructor() {
    this.name = 'xiaojie' // 在 xj 自身
    this.showName = function () { // 在 xj 自身
      console.log(name);
    }
  }
  age = 22 // 在 xj 自身
  show () { // 在 xj 的原型上
    console.log(this.age);
  }
  hah = { // 在 xj 自身
    j: 11
  }
}
const xj = new User()
console.log(xj);
```



static 静态属性：在 class 身上，适合实例对象共用

```js
class Request {
  static host = "https://www.baidu.com"
  api(url) {
    return Request.host + `/${url}`
  }
}

let obj = new Request();
console.log(Request);
console.log(obj);
console.log(obj.api("article"));
```

![image-20211116215516426](https://gitee.com/i_xiaojie/waring/raw/master/image-20211116215516426.png)

## checked

defaultchecked：第一次可以

## 连续解构赋值+重命名

```js
let obj = {a:{b:1}}
const {a} = obj; //传统解构赋值
const {a:{b}} = obj; //连续解构赋值
const {a:{b:value}} = obj; //连续解构赋值+重命名
```

## 浏览器历史记录

存储方式为**栈**结构

## let/const

如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错



