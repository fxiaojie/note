# 0.Vue 核心

## 0.hellow

​	注意区分：js 表达式和 js 代码（语句）

1. 表达式：一个表达式会产生一个值，可以放在任何需要值的地方
2. 代码：
   1. if() {}
   2. for() {}

```js
<body>
  <div id="app">
    <h1>hellow, {{hellow}}</h1>		 <!-- {{}} 里面必须写 js 表达式，且可以自动读取 data 中的所有属性 -->
    <button @click="handleClick">change</button>
  </div>
</body>
<script>
  Vue.config.productionTip = false // 阻止 Vue 在启动时生成生产提示
  // 创建 Vue 实例	vue 实例和容器是一对一绑定的
  let vm = new Vue({
    el: '#app', // el 用于指定当前 Vue 实例为哪个容器服务，值通常为 css 选择器字符串
    data: { // data 中用于存储数据，数据供 el 所指定的容器去使用
      hellow: '你好'
    },
    methods: {
      handleClick() {
        this.hellow = '不好'
      }
    }
  })
</script>
```

## 1.模板语法

标签体中使用插值语法

指令语法：解析标签（标签属性，标签体内容，绑定事件...）

```js
<body>
  <div id="app">
    <h1>指令语法</h1>
    <a :href="url">百度</a>   <!-- 使用 : 时里面的值（url）当成表达式执行  -->
  </div>
</body>
<script>
  Vue.config.productionTip = false // 阻止 Vue 在启动时生成生产提示
  let vm = new Vue({
    el: '#app',
    data: { 
      name: 'xiaojie',
      url: 'http://www.baidu.com'
    }
  })
</script>
```

## 2.数据绑定

单向绑定（v-bind）：只能从data中流向页面

双向绑定（v-model）：数据不仅能从data流向页面，还能从页面流向data（v-model:value 可以简写为 v-model，因为 v-model 默认收集的就是 value值）

```js
<body>
  <div id="app">
    <span>单项数据绑定：</span>
    <input type="text" :value="name" /> <br>
    <span>双向数据绑定：</span>
    <input type="text" v-model:value="name" />
    <!-- 下面错误，v-model 只能应用在表单类元素（输入类元素）上 -->
    <h3 v-model:z="name">hello</h3>
  </div>
</body>
<script>
  Vue.config.productionTip = false 

  let vm = new Vue({
    el: '#app',
    data: { 
      name: '小杰'
    }
  })
</script>
```

## 3.el与data

由 vue 管理的函数，一定不要写箭头函数，一旦写了箭头函数，this 就不在是 vue 实例了

```js
<body>
  <div id="app">
    {{name}}
  </div>
</body>
<script>
  Vue.config.productionTip = false 

  let vm = new Vue({
    // el: '#app',  // 第一种写法
    // data: {  // 第一种写法：对象式
    //   name: '小杰'
    // }
    data: function() {  // 第二种写法：函数式
      return {
        name: '小杰'
      }
    }
  })
  vm.$mount('#app')   // 第二种写法
</script>
```

## 4.MVVM模型

data 中所有的属性，最后都出现在了 vm 身上

vm 身上所有的属性及 Vue 原型上所有的属性，在 Vue 模板上都可以使用

![image-20210920085851137](https://i.loli.net/2021/09/20/hCv3ic4M7Rp1rZA.png)

![](https://i.loli.net/2021/09/20/ysXjflE1tx7PrHR.png)

## 5.数据代理

Object.defineProperty

数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

```js
<script>
  let obj1 = {x: 1}
  let obj2 = {y: 2}
  Object.defineProperty(obj2, 'x', {
    get() {
      return obj1.x
    },
    set(value) {
      obj1.x = value
    }
  })
</script>
```

![image-20210918165127879](https://i.loli.net/2021/09/20/6u5wViOI2cLsy7n.png)

## 6.事件处理

- 基本使用

  事件的回调需要配置在 methods 对象中，最终会在 vm 上

  methods 中配置的函数，都是被 Vue 所管理的函数，this 的指向是 vm 或 组件实例对象

  @click="demo" 和 @click="demo($event)" 效果一样，但后者可以传参

  ```js
  <body>
    <div id="root">
      <h2>欢迎来到{{adress}}</h2>
      <button @click="showInfo1">点击1</button>
      <button @click="showInfo2(66,$event)">点击2</button>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        adress: '北京'
      },
      methods: {
        showInfo1() {
          alert(this.adress + '欢迎你！')
        },
        showInfo2(num, event) {
          console.log(num, event);
          // console.log(event.target.innerText);
          alert(this.adress + '欢迎你！！！')
        }
      }
    })
  </script>
  ```

- 事件修饰符

  .prevent / .stop / .once / .capture / .self / .passive

  修饰符可以连续写

  ```js
  <style>
    .demo {
      margin: 50px;
      height: 100px;
      background-color: red;
    }
    .demo1 {
      margin: 20px;
      padding: 10px;
      background-color: blue;
    }
    .demo2 {
      background-color: yellow;
    }
  </style>
  <body>
    <div id="root">
      <h2>欢迎来到{{adress}}</h2>
      <!-- 阻止默认事件 -->
      <a href="https://www.baidu.com/" @click.prevent="showInfo1">点击1</a>
  
      <!-- 阻止事件冒泡 -->
      <div class="demo" @click="showInfo1">
        <button @click.stop="showInfo1">点击</button>
      </div>
  
      <!-- 事件只触发一次 -->
      <button @click.once="showInfo1">点击</button>
  
      <!-- 使用时间的捕获模式 -->
      <div class="demo1" @click.capture="showInfo2(1)"> 
        div1
        <div class="demo2" @click="showInfo2(2)"> 
          div2
        </div>
      </div>
  
      <!-- 只有 event.target 是当前操作的元素时才触发事件 -->
      <div class="demo1" @click.self="showInfo2(1)"> 
        div1
        <div class="demo2" @click="showInfo2(2)"> 
          div2
        </div>
      </div>
  
      <!-- .passive 事件的默认行为立即执行，无需等待事件回调执行完毕 -->
  
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        adress: '北京'
      },
      methods: {
        showInfo1() {
          alert(this.adress + '欢迎你！')
        },
        showInfo2(e) {
          alert(this.adress + '欢迎你！' + e)
        }
      }
    })
  </script>
  ```

- 键盘事件

  回车 => enter

  删除 => delete	（捕获“删除”和“空格”键）

  退出 => esc

  空格 => space

  上 => up

  下 => down

  左 => left

  右 => right

  tab: 特殊，配合 keydown 使用

  ```js
  <body>
    <div id="root">
      <input type="text" @keyup.huiche="showInfo">
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    Vue.config.keyCodes.huiche = 13   // 定义按键别名
    let vm = new Vue({
      el: '#root',
      data: {
      },
      methods: {
        showInfo(e) {
          // if(e.keyCode !== 13) return  // 13 为 enter 键
          console.log(e.target.value);
        }
      }
    })
  </script>
  ```

## 7.计算属性

- 插值语法实现

  ```js
  <body>
    <div id="root">
      姓：<input type="text" v-model="firstName"> <br>
      名：<input type="text" v-model="lastName"> <br>
      全名：<span>{{firstName.slice(0, 3)}}--{{lastName}}</span>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        firstName: '张',
        lastName: '三'
      }
    })
  </script>
  ```

- methods

  ```js
  <body>
    <div id="root">
      姓：<input type="text" v-model="firstName"> <br>
      名：<input type="text" v-model="lastName"> <br>
      全名：<span>{{fullName()}}</span>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        firstName: '张',
        lastName: '三'
      },
      methods: {
        fullName() {
          return this.firstName.slice(0, 3) + "--" + this.lastName
        }
      }
    })
  </script>
  ```

- 计算属性

  要用的属性不存在，要通过**已有的属性**计算得来

  底层借助了 Object.defineproperty 的 getter/setter

  内部又缓存机制（复用）

  计算属性最终会出现在 vm 上，直接使用即可

  ```js
  <body>
    <div id="root">
      姓：<input type="text" v-model="firstName"> <br>
      名：<input type="text" v-model="lastName"> <br>
      全名：<span>{{fullName}}</span>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        firstName: '张',
        lastName: '三'
      },
      computed: {
        fullName: {
           // get:当有人读取 fullName 时，get 就会被调用，且返回值就作为 fullName 的值
           // get调用： 1：初次读取 fullName 时调用 2：所依赖数据发生变化时调用
           get() {
            return this.firstName.slice(0, 3) + "--" + this.lastName
           },
           // set 调用：当 fullName 被修改时
           set(value) {
            const arr = value.split('-')
            this.firstName = arr[0]
            this.lastName = arr[1]
           }
        }
      }
    })
  </script>
  ```

- 简写

  ```js
  <body>
    <div id="root">
      姓：<input type="text" v-model="firstName"> <br>
      名：<input type="text" v-model="lastName"> <br>
      全名：<span>{{fullName}}</span>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        firstName: '张',
        lastName: '三'
      },
      computed: {
        // 简写
        // 只读不改时可以进行简写，此时不是函数，还是对象
        fullName() {
            return this.firstName.slice(0, 3) + "--" + this.lastName
        }
      }
    })
  </script>
  ```

## 8.侦听（监视）属性

- 计算属性事例

  ```js
  <body>
    <div id="root">
      <h2>今天天气很{{qiehuan}}</h2>
      <!-- 绑定时间的时候, @xxx="yyy" yyy可以写一些简单的语句 -->
      <!-- <button @click="isHot = !isHot">切换</button> -->
      <button @click="change()">切换</button>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        isHot: true
      },
      computed: {
        qiehuan() {
          return this.isHot ? '炎热' : '凉爽'
        }
      },
      methods: {
        change() {
          this.isHot = !this.isHot
        }
      }
    })
  </script>
  ```

- 监视属性watch

  1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作

  ​     2.监视的属性必须存在，才能进行监视！！（不会报错）

  ​     3.监视的两种写法：

  ​       (1).new Vue时传入watch配置

  ​       (2).通过vm.$watch监视

  ```js
  <body>
    <div id="root">
      <h2>今天天气很{{qiehuan}}</h2>
      <button @click="change()">切换</button>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        isHot: true
      },
      computed: {
        qiehuan() {
          return this.isHot ? '炎热' : '凉爽'
        }
      },
      methods: {
        change() {
          this.isHot = !this.isHot
        }
      },
      watch: {
        isHot: {
          immediate: true,  // 初始化时让 handler 调用一下
          // handler: 当 isHot 发生改变时调用
          handler(newValue, oldValue) {
            console.log('123', newValue, oldValue);
          }
        }
      }
    })
    // vm.$watch('isHot',{
  	// 	immediate:true, //初始化时让handler调用一下
  	// 	//handler什么时候调用？当isHot发生改变时。
  	// 	handler(newValue,oldValue){
  	// 		console.log('isHot被修改了',newValue,oldValue)
  	// 	}
  	// })
  </script>
  ```

- 深度监视

  1.vue 中的 watch 默认不监测对项目内部值的改变（一层）

  2.配置 deep：true可以监测对象内部的改变（多层）

  备注：Vue 自身可以监测对象内部值的改变，但 watch 默认不可以

  ```js
  <body>
    <div id="root">
      <h2>今天天气很{{qiehuan}}</h2>
      <button @click="change()">切换</button>
      <hr>
      <h2>数字a：{{numbers.a}}</h2>
      <button @click="numbers.a++">切换</button>
      <hr>
      <h2>数字b：{{numbers.b}}</h2>
      <button @click="numbers.b++">切换</button>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        isHot: true,
        numbers: {
          a: 1,
          b: 2
        }
      },
      computed: {
        qiehuan() {
          return this.isHot ? '炎热' : '凉爽'
        }
      },
      methods: {
        change() {
          this.isHot = !this.isHot
        }
      },
      watch: {
        isHot: {
          immediate: true,  // 初始化时让 handler 调用一下
          // handler: 当 isHot 发生改变时调用
          handler(newValue, oldValue) {
            console.log('123', newValue, oldValue);
          }
        },
        // 监视多级结构中某个属性
        'numbers.a': {  // 'numbers.a' 为原始写法
          handler() {
            console.log('a改变了');
          }
        },
        // 监视多级结构中所有属性
        numbers: {
          deep: true,
          handler() {
            console.log('numbers改变了，b++');
          }
        }
      }
    })
  </script>
  ```

- 简写

  简写不可以写 immediate: true，deep: true

  ```js
  <body>
    <div id="root">
      <h2>今天天气很{{qiehuan}}</h2>
      <button @click="change()">切换</button>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        isHot: true
      },
      computed: {
        qiehuan() {
          return this.isHot ? '炎热' : '凉爽'
        }
      },
      methods: {
        change() {
          this.isHot = !this.isHot
        }
      },
      watch: {
        // // 完整写法
        // isHot: {
        //   immediate: true,  // 初始化时让 handler 调用一下
        //   // handler: 当 isHot 发生改变时调用
        //   handler(newValue, oldValue) {
        //     console.log('123', newValue, oldValue);
        //   }
        // },
      //   // 简写
      //   isHot(newValue, oldValue) {
      //     console.log('123', newValue, oldValue);
      //   }
      }
    })
    // 完整写法
    // vm.$watch('isHot', {
    //   immediate: true,  // 初始化时让 handler 调用一下
    //   // handler: 当 isHot 发生改变时调用
    //   handler(newValue, oldValue) {
    //     console.log('123', newValue, oldValue);
    //   }
    // })
    // 简写
    vm.$watch('isHot', function(newValue, oldValue){
      console.log('123', newValue, oldValue);
    })
  </script>
  ```

- computed 和 watch

  1. computed 能完成的功能，watch 都能完成
  2. watch 能完成的功能，computed 不一定能完成。例：watch 可以进行异步操作
  3. 所有被 Vue 管理的函数，最好写成普通函数，这样 this 指向的是 vm 或组件实例对象
  4. 所有不被 Vue 管理的函数（定时器的回调函数，ajax 的回调函数等），最好写成箭头函数，这样 this 指向的是 vm 或组件实例对象

  ```js
  <body>
    <div id="root">
      姓：<input type="text" v-model="firstName"> <br>
      名：<input type="text" v-model="lastName"> <br>
      全名：<span>{{fullName}}</span>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        firstName: '张',
        lastName: '三',
        fullName: '张--三'
      },
      watch: {
        firstName(value) {
          setTimeout(() => {
            this.fullName = value.slice(0, 3) + '--' + this.lastName
          },1000)
          
        },
        lastName(value) {
          this.fullName = this.firstName.slice(0, 3) + '--' + value
          
        }
      }
    })
  </script>
  ```

## 9.样式绑定

- class 样式
- style 样式

## 10.条件渲染

- v-show

  切换频率较高的场景

  dispaly：none

- v-if

  切换频率较低的场景

  直接删除

- 使用 v-if 元素可能无法获取到，v-show 一定可以

## 11.列表渲染

- v-for   key 相当于身份证号

  面试题：react、vue中的key有什么作用？（key的内部原理）

  ​      1. 虚拟DOM中key的作用：

  ​          key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 

  ​          随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

  ​      2.对比规则：

  ​         (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：

  ​            ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！

  ​            ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

  ​         (2).旧虚拟DOM中未找到与新虚拟DOM相同的key

  ​            创建新的真实DOM，随后渲染到到页面。         

  ​      3. 用index作为key可能会引发的问题：

  ​           1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:

  ​               会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

  ​           2. 如果结构中还包含输入类的DOM：

  ​               会产生错误DOM更新 ==> 界面有问题。

  ​      4. 开发中如何选择key?:

  ​           1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。

  ​           2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，

  ​            使用index作为key是没有问题的。

- 列表过滤

  watch

  ```js
  <body>
    <div id="root">
      <ul>
        <input type="text" v-model="keyword">
        <li v-for="p in filpersons" :key="p.id">
          {{p.name}}
        </li>
      </ul>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        keyword: '',
        persons: [
          {id: 1, name: '马冬梅', age: 18},
          {id: 2, name: '周冬雨', age: 19},
          {id: 3, name: '周杰伦', age: 39},
          {id: 4, name: '温兆伦', age: 29}
        ],
        filpersons: []
      },
      watch: {
        keyword: {
          immediate: true,
          handler(val) {
            this.filpersons = this.persons.filter((p) => {
              return p.name.indexOf(val) !== -1
            })
          }
        }
      }
    })
  </script>
  ```

  computed

  ```js
  <body>
    <div id="root">
      <ul>
        <input type="text" v-model="keyword">
        <li v-for="p in filpersons" :key="p.id">
          {{p.name}}
        </li>
      </ul>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        keyword: '',
        persons: [
          {id: 1, name: '马冬梅', age: 18},
          {id: 2, name: '周冬雨', age: 19},
          {id: 3, name: '周杰伦', age: 39},
          {id: 4, name: '温兆伦', age: 29}
        ]
      },
      computed: {
        filpersons() { 
          return this.persons.filter((p) => {
            return p.name.indexOf(this.keyword) !== -1
          })  
        }
      }
    })
  </script>
  ```

- 排序

  ```js
  <body>
    <div id="root">
      <ul>
        <input type="text" v-model="keyword">
        <button @click="sortType = 0">原顺序</button>
        <button @click="sortType = 1">降序</button>
        <button @click="sortType = 2">升序</button>
        <li v-for="p in filpersons" :key="p.id">
          {{p.id}}-{{p.name}}-{{p.age}}
        </li>
      </ul>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
    let vm = new Vue({
      el: '#root',
      data: {
        keyword: '',
        sortType: 0,  // 0 原顺序，1降序，2升序
        persons: [
          {id: 1, name: '马冬梅', age: 18},
          {id: 2, name: '周冬雨', age: 19},
          {id: 3, name: '周杰伦', age: 39},
          {id: 4, name: '温兆伦', age: 29}
        ]
      },
      computed: {
        filpersons() { 
          const arr = this.persons.filter((p) => {
            return p.name.indexOf(this.keyword) !== -1
          }) 
          if(this.sortType) {
            arr.sort((a, b)=> {
              return this.sortType === 1 ? b.age - a.age : a.age - b.age
            })
          }
          return arr
        }
      }
    })
  </script>
  ```

   vue.set 添加属性，只能给data对象属性里添加，不能给data添加

  Vue监视数据的原理：

  ​    1. vue会监视data中所有层次的数据。

  ​    2. 如何监测对象中的数据？

  ​        通过setter实现监视，且要在new Vue时就传入要监测的数据。

  ​         (1).对象中后追加的属性，Vue默认不做响应式处理

  ​         (2).如需给后添加的属性做响应式，请使用如下API：

  ​             Vue.set(target，propertyName/index，value) 或 

  ​             vm.$set(target，propertyName/index，value)

  ​    3. 如何监测数组中的数据？

  ​         通过包裹数组更新元素的方法实现，本质就是做了两件事：

  ​          (1).调用原生对应的方法对数组进行更新。

  ​          (2).重新解析模板，进而更新页面。

  ​    4.在Vue修改数组中的某个元素一定要用如下方法：

  ​       1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()

  ​       2.Vue.set() 或 vm.$set()

     

  ​    特别注意：**Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！**

  ```js
  	<body>
  		<div id="root">
  			<h1>学生信息</h1>
  			<button @click="student.age++">年龄+1岁</button> <br/>
  			<button @click="addSex">添加性别属性，默认值：男</button> <br/>
  			<button @click="student.sex = '未知' ">修改性别</button> <br/>
  			<button @click="addFriend">在列表首位添加一个朋友</button> <br/>
  			<button @click="updateFirstFriendName">修改第一个朋友的名字为：张三</button> <br/>
  			<button @click="addHobby">添加一个爱好</button> <br/>
  			<button @click="updateHobby">修改第一个爱好为：开车</button> <br/>
  			<button @click="removeSmoke">过滤掉爱好中的抽烟</button> <br/>
  			<h3>姓名：{{student.name}}</h3>
  			<h3>年龄：{{student.age}}</h3>
  			<h3 v-if="student.sex">性别：{{student.sex}}</h3>
  			<h3>爱好：</h3>
  			<ul>
  				<li v-for="(h,index) in student.hobby" :key="index">
  					{{h}}
  				</li>
  			</ul>
  			<h3>朋友们：</h3>
  			<ul>
  				<li v-for="(f,index) in student.friends" :key="index">
  					{{f.name}}--{{f.age}}
  				</li>
  			</ul>
  		</div>
  	</body>
  
  	<script type="text/javascript">
  		Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。
  
  		const vm = new Vue({
  			el:'#root',
  			data:{
  				student:{
  					name:'tom',
  					age:18,
  					hobby:['抽烟','喝酒','烫头'],
  					friends:[
  						{name:'jerry',age:35},
  						{name:'tony',age:36}
  					]
  				}
  			},
  			methods: {
  				addSex(){
  					// Vue.set(this.student,'sex','男')
  					this.$set(this.student,'sex','男')
  				},
  				addFriend(){
  					this.student.friends.unshift({name:'jack',age:70})
  				},
  				updateFirstFriendName(){
  					this.student.friends[0].name = '张三'
  				},
  				addHobby(){
  					this.student.hobby.push('学习')
  				},
  				updateHobby(){
  					// this.student.hobby.splice(0,1,'开车')
  					// Vue.set(this.student.hobby,0,'开车')
  					this.$set(this.student.hobby,0,'开车')
  				},
  				removeSmoke(){
  					this.student.hobby = this.student.hobby.filter((h)=>{
  						return h !== '抽烟'
  					})
  				}
  			}
  		})
  	</script>
  ```

## 12.收集表单数据

收集表单数据：

​     若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。

​     若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。

​     若：<input type="checkbox"/>

​       1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）

​       2.配置input的value属性:

​         (1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）

​         (2)v-model的初始值是数组，那么收集的的就是value组成的数组

​     备注：v-model的三个修饰符：

​         lazy：失去焦点再收集数据

​         number：输入字符串转为有效的数字

​         trim：输入首尾空格过滤

```js
		<div id="root">
			<form @submit.prevent="demo">
				账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/>
				密码：<input type="password" v-model="userInfo.password"> <br/><br/>
				年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/>
				性别：
				男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
				女<input type="radio" name="sex" v-model="userInfo.sex" value="female"> <br/><br/>
				爱好：
				学习<input type="checkbox" v-model="userInfo.hobby" value="study">
				打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
				吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
				<br/><br/>
				所属校区
				<select v-model="userInfo.city">
					<option value="">请选择校区</option>
					<option value="beijing">北京</option>
					<option value="shanghai">上海</option>
					<option value="shenzhen">深圳</option>
					<option value="wuhan">武汉</option>
				</select>
				<br/><br/>
				其他信息：
				<textarea v-model.lazy="userInfo.other"></textarea> <br/><br/>
				<input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
				<button>提交</button>
			</form>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false

		new Vue({
			el:'#root',
			data:{
				userInfo:{
					account:'',
					password:'',
					age:18,
					sex:'female',
					hobby:[],
					city:'beijing',
					other:'',
					agree:''
				}
			},
			methods: {
				demo(){
					console.log(JSON.stringify(this.userInfo))
				}
			}
		})
	</script>
```

## 13.过滤器

过滤器：

​    定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。

​    语法：

​      1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}

​      2.使用过滤器：{{ xxx | 过滤器名}} 或 v-bind:属性 = "xxx | 过滤器名"

​    备注：

​      1.过滤器也可以接收额外参数、多个过滤器也可以串联

​      2.并没有改变原本的数据, 是产生新的对应的数据

```js
	<script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.10.6/dayjs.min.js"></script>
	<body>
		<div id="root">
			<h2>显示格式化后的时间</h2>
			<!-- 计算属性实现 -->
			<h3>现在是：{{fmtTime}}</h3>
			<!-- methods实现 -->
			<h3>现在是：{{getFmtTime()}}</h3>
			<!-- 过滤器实现 -->
			<h3>现在是：{{time | timeFormater}}</h3>
			<!-- 过滤器实现（传参） -->
			<h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
			<h3 :x="msg | mySlice">尚硅谷</h3>
		</div>

		<div id="root2">
			<h2>{{msg | mySlice}}</h2>
		</div>
	</body>

	<script type="text/javascript">
		Vue.config.productionTip = false
		//全局过滤器
		Vue.filter('mySlice',function(value){
			return value.slice(0,4)
		})
		
		new Vue({
			el:'#root',
			data:{
				time:1621561377603, //时间戳
				msg:'你好，尚硅谷'
			},
			computed: {
				fmtTime(){
					return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
				}
			},
			methods: {
				getFmtTime(){
					return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
				}
			},
			//局部过滤器
			filters:{
				timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
					// console.log('@',value)
					return dayjs(value).format(str)
				}
			}
		})

		new Vue({
			el:'#root2',
			data:{
				msg:'hello,atguigu!'
			}
		})
	</script>
```

## 14.内置指令

- v-text

  向其所在的节点中渲染文本内容，会替换掉节点中的内容，{{xx}}不会

- v-html

  v-html指令：

  ​      1.作用：向指定节点中渲染包含html结构的内容。

  ​      2.与插值语法的区别：

  ​         (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。

  ​         (2).v-html可以识别html结构。

  ​      3.严重注意：v-html有安全性问题！！！！

  ​         (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。

  ​         (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

- v-cloak

   v-cloak指令（没有值）：

  ​      1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。

  ​      2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。

- v-once

  只渲染一次

- v-pre

  不进行解析编译，直接使用节点内容

## 15.自定义指令

自定义指令总结：

​      一、定义语法：

​         (1).局部指令：

​            new Vue({                 												new Vue({

​             directives:{指令名:配置对象}  		或    			 		directives{指令名:回调函数}

​            })                  												 			})

​         (2).全局指令：

​             Vue.directive(指令名,配置对象) 		或 		 Vue.directive(指令名,回调函数)



​      二、配置对象中常用的3个回调：

​         (1).bind：指令与元素成功绑定时调用。

​         (2).inserted：指令所在元素被插入页面时调用。

​         (3).update：指令所在模板结构被重新解析时调用。



​      三、备注：

​         1.指令定义时不加v-，但使用时要加v-；

​         2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。

```js
<body>
  <div id="root">
    <span>当前n值是：<h2 v-text="n"></h2></span>
    <span>放大后：<h2 v-big="n"></h2></span>
    <button @click="n++">+1</button>
    <hr>
    <input type="text" v-fbind:value="n">
  </div>
</body>
<script>
  Vue.config.productionTip = false 

  // 全局写法
  Vue.directive('big', function(element, binding) {
    element.innerText = binding.value * 10
  })
  // Vue.directive('fbind', {
  //       // 指令与元素成功绑定时
  //       bind(element, binding) {
  //         element.value = binding.value
  //       },
  //       // 指令所在元素被插入页面时
  //       inserted(element, binding) {
  //         element.focus()
  //       },
  //       // 指令所在模板被重新解析时
  //       update(element, binding) {
  //         element.value = binding.value
  //       }
  //     })

  let vm = new Vue({
    el: '#root',
    data: {
      n: 1
    },
    directives: {
      // 1.指令与元素成功绑定时调用。2.所依赖的数据改变时调用，指令所在模板被重新解析时调用
      // big(element, binding) {
      //   element.innerText = binding.value * 10
      // },
      fbind: {
        // 指令与元素成功绑定时
        bind(element, binding) {
          element.value = binding.value
        },
        // 指令所在元素被插入页面时
        inserted(element, binding) {
          element.focus()
        },
        // 指令所在模板被重新解析时
        update(element, binding) {
          element.value = binding.value
        }
      }
    }
  })
</script>
```

## 16.生命周期

![生命周期](https://i.loli.net/2021/09/20/jUE9HySIrsXgxAq.png)

# 1.组件化

## 0.非单文件组件

-  Vue中使用组件的三大步骤：

  ​     一、定义组件(创建组件)

  ​     二、注册组件

  ​     三、使用组件(写组件标签)

  

     一、如何定义一个组件？

  ​      使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；

  ​      区别如下：

  ​        1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。

  ​        2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。

  ​      备注：使用template可以配置组件结构。

  

     二、如何注册组件？

  ​       1.局部注册：靠new Vue的时候传入components选项

  ​       2.全局注册：靠Vue.component('组件名',组件)

  

     三、编写组件标签：

  ​       <school></school>

  ```js
  <body>
    <div id="root">
      
      <h2>{{mm}}</h2>
      <hr>
      <hellow></hellow>
      <hr>
      <school></school>
      <hr>
      <student></student>
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
  
    // 创建school 组件
    const school = Vue.extend({
      template: `
        <div>
          <h2>学校名称：{{schoolName}}</h2>
          <h2>学校地址：{{adress}}</h2>  
        </div>
      `,
      data() {
        return {
          schoolName: '县一中',
          adress: '濮阳'
        }
      }
    })
  
    // 创建学生组件
    const student = Vue.extend({
      template: `
        <div>
          <h2>学生姓名：{{studentName}}</h2>
          <h2>年龄：{{age}}</h2>
          <button @click="showName">点击</button>
        </div>
      `,
      data() {
        return {
          studentName: '小杰',
          age: '18'
        }
      },
      methods: {
        showName() {
          alert(this.studentName)
        }
      },
    })
  
    // hellow 组件
    const hellow = Vue.extend({
      template: `
        <div>
          <h2>hellow,{{name}}</h2>
        </div>
      `,
      data() {
        return {
          name: '小杰'
        }
      }
    })
  
    // 全局注册
    Vue.component('hellow', hellow)
  
    let vm = new Vue({
      el: '#root',
      data: {
        mm: 'hello'
      },
      // 局部注册
      components: {
        school,
        student
      }
    })
  </script>
  ```

- 注意

  1.关于组件名:

  ​        一个单词组成：

  ​           第一种写法(首字母小写)：school

  ​           第二种写法(首字母大写)：School

  ​        多个单词组成：

  ​           第一种写法(kebab-case命名)：my-school

  ​           第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)

  ​        备注：

  ​          (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。

  ​          (2).可以使用name配置项指定组件在开发者工具中呈现的名字。

  

  ​     2.关于组件标签:

  ​        第一种写法：<school></school>

  ​        第二种写法：<school/>

  ​        备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

  

  ​     3.一个简写方式：

  ​        const school = Vue.extend(options) 可简写为：const school = options

- 嵌套

  ```js
  <body>
    <div id="root">
      
    </div>
  </body>
  <script>
    Vue.config.productionTip = false 
  
    // 创建学生组件
    const student = Vue.extend({
      // name: 'xuesheng',
      template: `
        <div>
          <h2>学生姓名：{{studentName}}</h2>
          <h2>年龄：{{age}}</h2>
          <button @click="showName">点击</button>
        </div>
      `,
      data() {
        return {
          studentName: '小杰',
          age: '18'
        }
      },
      methods: {
        showName() {
          alert(this.studentName)
        }
      }
    })
  
    // 创建school 组件
    const school = Vue.extend({
      name: 'xuexiao',
      template: `
        <div>
          <h2>学校名称：{{schoolName}}</h2>
          <h2>学校地址：{{adress}}</h2>  
          <student></student>
        </div>
      `,
      data() {
        return {
          schoolName: '县一中',
          adress: '濮阳'
        }
      },
      components: {
        student
      }
    })
  
    // hellow 组件
    const hellow = Vue.extend({
      template: `
        <div>
          <h2>hellow,{{name}}</h2>
        </div>
      `,
      data() {
        return {
          name: '小杰'
        }
      }
    })
  
    // 全局注册
    Vue.component('hellow', hellow)
  
    const App = {
      template: `
        <div>
          <school></school>
          <hellow></hellow> 
        </div>
      `,
      components: {
        school
      }
    }
  
    let vm = new Vue({
      el: '#root',
      template: `
        <div>
          <App></App>
          <h2>haha{{msg}}</h2>
        </div>
      `,
      data: {
        msg: 'hello,xiaojie'
      },
      // 局部注册
      components: {
        App
      }
    })
  </script>
  ```

- VueComponent

  ​	  1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

  

  ​      2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，

  ​       即Vue帮我们执行的：new VueComponent(options)。

  

  ​      3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！

  

  ​      4.关于this指向：

  ​        (1).组件配置中：

  ​           data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。

  ​        (2).new Vue(options)配置中：

  ​           data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。

  

  ​      5.VueComponent的实例对象，简称vc（也可称之为：组件实例对象）。

  ​       Vue的实例对象，以后简称vm。

- 内置关系

  1.一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype

  2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。

  ![image-20210921143022494](https://i.loli.net/2021/09/21/XHMLf5sDBOREp6w.png)

- 

## 1.单文件组件

不同版本的 vue ：

​	1.vue.js 与 vue.runtime.xxx.js 的区别

​		（1）vue.js 是完整版的 Vue，包含：核心功能 + 模板解析器

​		（2）vue.runtime.xxx.js 是运行版的 Vue，包含：核心功能，没有模板解析器

​	2.因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 配置项，需要使用 render 函数接受到的 cerateElement 函数去指定具体内容



## 2.

