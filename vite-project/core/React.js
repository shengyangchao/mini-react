const createTextElement = (nodeValue) => {
    return {
        type: 'textNode',
        props: {
            nodeValue,
            children: [], //为了写代码方便 没有children也加上 children:[]
        },
    }
}
const createElement = (type, props, ...children) => {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) => {
                return typeof child == 'string' ? createTextElement(child) : child
            }),
        },
    }
}
let nextWorkUnit = null
const renderDom = (container, el) => {
    nextWorkUnit = {
        dom: container,
        props: { children: [el] },
    }
    // const dom =
    //     el.type === 'textNode' ? document.createTextNode('') : document.createElement(el.type)
    // Object.keys(el.props).forEach((key) => {
    //     if (key !== 'children') {
    //         dom[key] = el.props[key]
    //     }
    // })
    // const children = el.props.children
    // children.forEach((child) => {
    //     renderDom(dom, child)
    // })
    // container.append(dom)
}

const workLoop = (deadLine) => {
    let showYield = false
    while (!showYield && nextWorkUnit) {
        //执行work,返回下一个任务
        nextWorkUnit = performanceWorkUnit(nextWorkUnit)
        showYield = deadLine.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
}
const performanceWorkUnit = (work) => {
    //和renderDom操作一样，创建元素，append，处理props,处理children(将树转换成列表，边转换边append元素)
    if (!work.dom) {
        const dom = (work.dom =
            work.type === 'textNode'
                ? document.createTextNode('')
                : document.createElement(work.type))
        //插入
        work.parent.dom.append(dom)
        //处理props
        Object.keys(work.props).forEach((key) => {
            if (key !== 'children') {
                dom[key] = work.props[key]
            }
        })
    }
    const children = work.props.children
    let prevChild = null //记录上一个节点
    children.forEach((child, index) => {
        //为了不破坏虚拟dom的结构，重新创建fiber结构
        const newFiber = {
            type: child.type,
            props: child.props,
            dom: null,
            parent: work,
            child: null,
            sibling: null,
        }
        if (index === 0) {
            //添加子节点的指向
            work.child = newFiber
        } else {
            prevChild.sibling = newFiber
        }
        prevChild = newFiber
    })
    //返回下一个任务（下一个节点），返回的优先级 孩子->兄弟->叔叔
    if (work.child) {
        return work.child
    }
    if (work.sibling) {
        return work.sibling
    }
    return work.parent?.sibling
}
requestIdleCallback(workLoop)

const React = {
    createElement,
    renderDom,
}
export default React
