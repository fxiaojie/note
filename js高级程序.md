

# 第一章

web 浏览器只是 ECMAScript 实现可能存在的一种宿主环境

ECMAScript, dom, bom

# 第二章

## 0.\<script>元素

- 在使用行内 js 代码时，要注意代码中不能出现 \</script>，否则会报错

  ```js
  <script> 
   function sayScript() { 
   console.log("</script>"); 
   } 
  </script>
  ```

  可以在载 \<script> 中加入 “\”

  ```js
  <script> 
   function sayScript() { 
   console.log("<\/script>"); 
   } 
  </script>
  ```

- 使用了 src 属性的 \<script> 元素不应该再在 \<script> 和 \<script> 标签中再包含其他代码

- 通常将所有 js 引用放在 \<body> 元素中的页面内容后面

- defer 属性：只对外部脚本文件有效，脚本会被延迟到整个页面都解析完毕后再执行

# 第三章

## 0.语法

- ECMAScript 中的一切都区分大小写

