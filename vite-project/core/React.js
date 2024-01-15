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
                const isTextNode = typeof child == 'string' || typeof child === 'number'
                return isTextNode ? createTextElement(child) : child
            }),
        },
    }
}
let nextWorkUnit = null
let root = null
const renderDom = (container, el) => {
    nextWorkUnit = {
        dom: container,
        props: { children: [el] },
    }
    root = nextWorkUnit
}

const workLoop = (deadLine) => {
    let showYield = false
    while (!showYield && nextWorkUnit) {
        //执行work,返回下一个任务
        nextWorkUnit = performanceWorkUnit(nextWorkUnit)
        showYield = deadLine.timeRemaining() < 1
    } //到最后一个节点了下一个任务为null,此时统一渲染dom且只需要提交一次
    if (!nextWorkUnit && root) {
        commitRoot()
    }

    requestIdleCallback(workLoop)
}
const commitRoot = () => {
    commitWork(root.child)
    root = null //提交一次之后root设为null
}
const commitWork = (fiber) => {
    if (!fiber) return
    //兼容function component <App> 这一层没有dom 往上找parent
    let fiberParent = fiber.parent
    //dom没值 往上找

    while (!fiberParent.dom) {
        fiberParent = fiberParent.parent
    }
    if (fiber.dom) {
        fiberParent.dom.append(fiber.dom)
    }

    // 递归把子节点渲染
    commitWork(fiber.child)
    // 递归把兄弟节点渲染
    commitWork(fiber.sibling)
}

const createDom = (fiber) => {
    const dom = (fiber.dom =
        fiber.type === 'textNode'
            ? document.createTextNode('')
            : document.createElement(fiber.type))
    return dom
}

const handlerProps = (fiber) => {
    if (fiber.props) {
        Object.keys(fiber.props).forEach((key) => {
            if (key !== 'children') {
                fiber.dom[key] = fiber.props[key]
            }
        })
    }

    return fiber
}
const initChildren = (fiber, children) => {
    let prevChild = null //记录上一个节点
    children &&
        children.forEach((child, index) => {
            //为了不破坏虚拟dom的结构，重新创建fiber结构
            const newFiber = {
                type: child.type,
                props: child.props,
                dom: null,
                parent: fiber,
                child: null,
                sibling: null,
            }
            if (index === 0) {
                //添加子节点的指向
                fiber.child = newFiber
            } else {
                prevChild.sibling = newFiber
            }
            prevChild = newFiber
        })
}
const isFunctionComponent = (fiber) => {
    return typeof fiber.type === 'function'
}

const performanceWorkUnit = (fiber) => {
    const isFuncCom = isFunctionComponent(fiber)
    //function那一层不需要dom fiber.type()拿到的就是组件里面的结构
    if (!isFuncCom) {
        if (!fiber.dom) {
            //创建元素
            createDom(fiber)
            //插入
            // work.parent.dom.append(dom) //这样插入会出现时间不够，显示不全dom的情况。改为链表创建完毕，到最后一个节点，统一渲染dom
            //处理props
            handlerProps(fiber)
        }
    }
    const children = isFuncCom ? [fiber.type(fiber.props)] : fiber.props.children
    initChildren(fiber, children)
    //返回下一个任务（下一个节点），返回的优先级 孩子->兄弟->叔叔 多个函数组件需要循环找兄弟
    if (fiber.child) {
        return fiber.child
    }

    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
}
requestIdleCallback(workLoop)

const React = {
    createElement,
    renderDom,
}
export default React
