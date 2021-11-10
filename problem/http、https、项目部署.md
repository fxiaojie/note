### 问题描述

***问题原因：HTTPS页面里动态的引入HTTP资源，比如引入一个js文件，会被直接block掉的.在HTTPS页面里通过AJAX的方式请求HTTP资源，也会被直接block掉的。***

 ![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bba638ea5e2f45a494e1b9c9075f2605~tplv-k3u1fbpfcp-watermark.awebp?)

### 1

可以在相应的页面的里加上这句代码，意思是自动将http的不安全请求升级为https

```js
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

### 2

只需更改你的url变量中 http：// 到 // ，所以当页面加载http时，ajax请求将使用http协议，如果加载https，浏览器将ajax请求协议设置为https

```js
// 修改前
 $ .ajax({
 url："http://example.com/non-https"，
 .. 
 .. 
 
 // 修改后
  $ .ajax({
 url："// example.com/non-https"，
 .. 
 .. 
```

### 总结

如果目标有https资源,就是用https方式能打开连接，可以直接用相对路径例如`//baidu.com`，如果不想改，而且确定连接有https资源，也可以用

```js
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

不过如果目标本身没有https资源，无论你用jsonp还是meta标签还是相对路径都无法解决的，唯一能解决的方法是自己在后端抓取目标页面的内容然后以https形式输出给前端，就像代理页一样，不过这样影响效率，如果是api接口类可以尝试，如果是图片视频类恐怕比较慢