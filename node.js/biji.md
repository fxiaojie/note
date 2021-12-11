exports 相当于在内存中添加属性，require指向这一内存（本质就是对象的引用赋值），以module.exports为主

module.exports = exports，导出的是module.exports

export/inport：export 导出的**不是对象**，是值的引用

拼接路径

```js
const path = require('path');

const basePath = '/User/why';
const filename = 'abc.txt';

const filepath = path.resolve(basePath, filename);
```

path.join()





箭头函数不绑定 this 和 arguments





async/await

`await` 上面的语句相当于`promise`里的函数，下面的语句相当于`.then`的回调

**浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务**。