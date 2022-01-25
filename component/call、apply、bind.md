### 手写`call`

```js
Function.prototype.xjcall = function(thisArg, ...arg) {
  // 获取需要被执行的函数，this 指向调用xjcall的函数
  const fn = this;

  // 将 thisArg 转为对象类型
  thisArg = (thisArg !== undefined && thisArg !== null) ? Object(thisArg) : window;
  
  // 调用需要被执行的函数
  // 在thisArg上添加fn函数作为其属性
  thisArg.fn = fn;
  const result = thisArg.fn(...arg);
  // 删除对象的属性
  delete thisArg.fn;
  
  return result;
}
```

### 手写`apply`

```js
Function.prototype.xjapply = function(thisArg, argArray) {
  // 获取到要执行的函数，this 指向调用xjapply的函数
  const fn = this;

  // 将 thisArg 转为对象类型
  thisArg = (thisArg !== undefined && thisArg !== null) ? Object(thisArg) : window;

  // 执行函数 
  thisArg.fn = fn;
  // 如果没有第二个参数则转为空数组
  argArray = argArray || [];
  const result = thisArg.fn(...argArray);
  delete thisArg.fn;

  return result;
}
```

### 手写`bind`

```js
Function.prototype.xjbind = function (thisArg, ...argArray) {
  // 获取到要执行的函数，this 指向调用xjbind的函数
  const fn = this;
  // 将 thisArg 转为对象类型
  thisArg = (thisArg !== undefined && thisArg !== null) ? Object(thisArg) : window;

  function proxyFn (...args) {
    // 执行函数
    thisArg.fn = fn;
    // 对两个传入的参数进行合并
    const finalArgs = [...argArray, ...args];
    const result = thisArg.fn(...finalArgs);
    delete thisArg.fn;

    return result;
  }

  return proxyFn;
}
```

