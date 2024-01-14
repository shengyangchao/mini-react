## vdom

从静态创建元素到动态创建元素，函数封装思想  
VDom 实际上就是描述元素的 js 对象。包括了类型 props children  
顺便复习了下剩余参数...args 会解构成数组,args 会收集剩余参数  
arguments 对象 arguments 可以拿到参数中所有实参  
剩余参数和 arguments 对象的区别 1.剩余参数对应了那些没有对应行参的实参，arguments 对象包含了传给函数的所有实参 2.剩余参数是真正的数组。arguments 是类数组对象  
3.arguments 对象还有一些附加的属性 入 callee

### 类数组对象转数组

Array.from  
Array.slice  
[...类数组对象]

### renderDom

renderDom 函数就是执行了三件事 1.创建元素 2.添加属性 3.挂载元素

jsx 的支持是通过 vite 的转化把 jsx 转成 React.createElement

## fiber

为什么引入 fiber？为了解决 dom 树过大卡顿。引入 requestIdleCallback，在浏览器一帧最后有剩余时间时执行。
因为是会在剩余时间里执行，需要记录节点之间的关系，防止下次执行时找不到节点。需要把树转成链表,边转边 append 比全部转换成链表省时。

### requestIdleCallback

requestIdleCallback 函数接收一个回调函数，会传递一个 deadline 对象，可以调用 timeRemaining()拿到剩余时间
