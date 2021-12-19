预编译

作用域链按定义的地方（编译时定义），不是调用的地方

基本类型在栈内存，复杂类型在堆内存

执行外部函数的时候解析内部函数

`forEach/map/filter/find`：`this`指向传入的第二个参数

`call`传入的参数是`null`或`undefined`，此时，`this`指向`window`

