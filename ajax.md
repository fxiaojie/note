# 0.原生ajax

## 0.特性

在页面不刷新的情况下更新数据，与服务器交互

没有浏览历史，不能回退

存在跨域问题

## 1.http协议

请求报文

行

头

空行

体

响应报文

```js
// 1.引入express
const express = require("express");

// 2.创建应用对象
const app = express();

// 3.创建路由规则
// request 是对请求报文的封装
// response 是对响应报文的封装
app.get('/', (request, response) => {
  // 设置响应
  response.send('hello EXPRESS')
})

// 4.监听端口启动服务
app.listen(8000, () => {
  console.log('服务已将启动，8000端口监视中...');
})
```
