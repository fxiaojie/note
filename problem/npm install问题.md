

# 淘宝镜像

设置为淘宝镜像

```js
npm config set registry registry.npm.taobao.org/
yarn config set registry registry.npm.taobao.org/
```

切换为原来的

```js
npm config set registry registry.npmjs.org/
```



# 报错信息

![image-20211117092525035](https://gitee.com/i_xiaojie/waring/raw/master/image-20211117092525035.png)



使用`npm config list`查看当前配置，如下图，已被设置代理

![image-20211117092424090](https://gitee.com/i_xiaojie/waring/raw/master/image-20211117092424090.png)

使用如下两行命令将代理设置为空

```js
npm config set proxy null
npm config set https-proxy null
```

