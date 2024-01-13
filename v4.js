//动态append
console.log('v4')
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
//创建节点，props属性赋值到元素上，append
const render = (container, el) => {
    const dom =
        el.type === 'textNode' ? document.createTextNode('') : document.createElement(el.type)
    Object.keys(el.props).forEach((key) => {
        if (key !== 'children') {
            dom[key] = el.props[key]
        }
    })
    const children = el.props.children
    children.forEach((child) => {
        render(dom, child)
    })
    container.append(dom)
}
const container = document.querySelector('#root')
const textElement = createTextElement('mini-react')
// const el = createElement('div', { id: 'div-wrap' }, textElement)
const el = createElement('div', { id: 'div-wrap' }, 'mini-react-1') //text只传字符串
render(container, el)

// const div = document.createElement(el.type)
// div.id = el.props.id
// container.appendChild(div)

// const textNode = document.createTextNode('')
// textNode.nodeValue = textElement.props.nodeValue
// div.appendChild(textNode)
