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

const React = {
    createElement,
    renderDom,
}
export default React
