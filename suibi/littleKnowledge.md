1. Object.prototype.toString.call() 判断数据类型

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

2. ...new Set()数组去重

   ```js
   console.log(...new Set([1, 2, 3, 4, 2, 1]));    // 1 2 3 4
   ```

3. 闭包是指有权访问另一个函数作用域中的变量的函数

   内部函数没有执行完成，外部函数变量不会被销毁

4. css三角形

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

5. 深拷贝

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
   
   
   Array.from()	// 只针对数组
   ```

6. 浅拷贝

   ```js
   Object.assign(target,source)
   ```

7. 防抖

   ```js
       function debounce(fn, wait) {
         let time = null;
         return function() {
           if(time !== null) {
             clearTimeout(time);
           }
           time = setTimeout(() => {
             fn.call(this);
           }, wait)
         }
       }
   ```

8. 节流

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

9. 解构赋值可以进行数据交换

   ```js
   let a = 10, b = 20;
   [a, b] = [b, a];
   ```

10. 冻结变量

    ```js
    Object.freeze()
    ```

11. 转换为布尔类型，两次取反（Boolean也可以）

    1. 首先先转换为布尔类型，再取反
    2. 再进行取反，获得原来值
    
12. for 循环时基础类型会复制一份，引用类型是原地址

13. 普通函数 this 指向 window，箭头函数 this 指向上下文（父级作用域 this）

14. 在Vue开发中，会有一些数据，从始至终都`未曾改变过`，这种`死数据`，既然`不改变`，那也就`不需要对他做响应式处理`了，不然只会做一些无用功消耗性能，比如一些写死的下拉框，写死的表格数据，这些数据量大的`死数据`，如果都进行响应式处理，那会消耗大量性能

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

    
