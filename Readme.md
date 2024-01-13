从静态创建元素到动态创建元素，函数封装思想
VDom 实际上就是描述元素的 js 对象。包括了类型 props children
顺便复习了下剩余参数...args 会解构成数组,args 会收集剩余参数
arguments 对象 arguments 可以拿到参数中所有实参
剩余参数和 arguments 对象的区别 1.剩余参数对应了那些没有对应行参的实参，arguments 对象包含了传给函数的所有实参 2.剩余参数是真正的数组。arguments 是类数组对象
3.arguments 对象还有一些附加的属性 入 callee
类数组对象转数组
Array.from
Array.slice
[...类数组对象]

renderDom 函数就是执行了三件事 1.创建元素 2.添加属性 3.挂载元素

jsx 的支持是通过 vite 的转化把 jsx 转成 React.createElement
