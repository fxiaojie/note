上述代码中，`break outer` 向上寻找名为 `outer` 的标签并跳出当前循环。

因此，控制权直接从 `(*)` 转至 `alert('Done!')`。script、src

```html
<script src="file.js">
  alert(1); // 此内容会被忽略，因为设定了 src
</script>
```

## BigInt

`BigInt` 类型是最近被添加到 JavaScript 语言中的，用于表示任意长度的整数。

可以通过将 `n` 附加到整数字段的末尾来创建 `BigInt` 值

```js
// 尾部的 "n" 表示这是一个 BigInt 类型
const bigInt = 1234567890123456789012345678901234567890n;
```

## null、undefined

```js
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) true

alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)

// null 只与 undefined 互等
undefined == null	// true
```

## &&、||、!

与运算 `&&` 的优先级比或运算 `||` 要高。

与运算返回第一个假值，而或运算返回第一个真值。

非运算符 `!` 的优先级在所有逻辑运算符里面最高，所以它总是在 `&&` 和 `||` 之前执行

## 空值合并运算符 `??`

`a ?? b` 的结果是：

- 如果 `a` 是已定义的，则结果为 `a`，
- 如果 `a` 不是已定义的，则结果为 `b`

## break/continue 标签

```js
outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // 如果是空字符串或被取消，则中断并跳出这两个循环。
    if (!input) break outer; // (*)

    // 用得到的值做些事……
  }
}
alert('Done!');
// 上述代码中，break outer 向上寻找名为 outer 的标签并跳出当前循环。
// 因此，控制权直接从 (*) 转至 alert('Done!')。
```

只有在循环内部才能调用 `break/continue`，并且标签必须位于指令上方的某个位置。

## 函数

没有返回值或返回值为空时会默认返回 `undefined`

```js
// 函数声明
function sum(a, b) {
  return a + b;
}

// 在函数声明被定义之前，它就可以被调用。
```

```js
// 函数表达式
let sum = function(a, b) {
  return a + b;
};

// 函数表达式是在代码执行到达时被创建，并且仅从那一刻起可用。
// 一旦代码执行到赋值表达式 let sum = function… 的右侧，此时就会开始创建该函数，并且可以从现在开始使用（分配，调用等）。
```

## 对象

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // 多词属性名必须加引号
};

delete user.age;		// 可以用 delete 操作符移除属性

// 方括号中可以是任何字符，也可以是表达式
// 设置
user["likes birds"] = true;
// 读取
alert(user["likes birds"]); // true
// 删除
delete user['likes birds'];

let key = prompt("What do you want to know about the user?", "name");

// 访问变量，不加引号
alert( user[key] ); // John（如果输入 "name"）
```

## 方法

作为对象属性的函数被称为 **方法**

```js
// 这些对象作用一样
user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 方法简写看起来更好，对吧？
let user = {
  sayHi() { // 与 "sayHi: function()" 一样
    alert("Hello");
  }
};
```

## 可选链 `?.`

例如 `value?.prop`：

- 如果 `value` 存在（当 `value` 不为`undefined/null` 时），则结果与 `value.prop` 相同，
- 否则（当 `value` 为 `undefined/null` 时）则返回 `undefined`。

可选链 `?.` 语法有三种形式：

1. `obj?.prop` —— 如果 `obj` 存在则返回 `obj.prop`，否则返回 `undefined`。
2. `obj?.[prop]` —— 如果 `obj` 存在则返回 `obj[prop]`，否则返回 `undefined`。
3. `obj.method?.()` —— 如果 `obj.method` 存在则调用 `obj.method()`，否则返回 `undefined`。

## Symbol

对象的属性键只能是字符串类型或者 Symbol 类型

Symbol 属性不参与 `for..in` 循环。`Object.keys()` 也会忽略它们。

[Object.assign](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 会同时复制字符串和 symbol 属性

## 字符串

获取子字符串

1. slice：不改变原数组
2. substr
3. substring：不改变原数组

## 数组

`push/pop` 方法运行的比较快，而 `shift/unshift` 比较慢

清空数组最简单的方法就是：`arr.length = 0;`



