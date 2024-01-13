//对齐reactapi
//ReactDom.createRoot( document.querySelector('#root')).render(<App/>)
console.log('v5')
const ReactDom = {
    createRoot(container) {
        return {
            render(el) {
                renderDom(container, el)
            },
        }
    },
}
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
const renderDom = (container, el) => {
    const dom =
        el.type === 'textNode' ? document.createTextNode('') : document.createElement(el.type)
    Object.keys(el.props).forEach((key) => {
        if (key !== 'children') {
            dom[key] = el.props[key]
        }
    })
    const children = el.props.children
    children.forEach((child) => {
        renderDom(dom, child)
    })
    container.append(dom)
}
const container = document.querySelector('#root')
const textElement = createTextElement('mini-react')
const el = createElement('div', { id: 'div-wrap' }, 'mini-react-2') //text只传字符串
ReactDom.createRoot(container).render(el)
