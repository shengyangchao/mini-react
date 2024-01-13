//封装生成元素
console.log('v3')
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
            children,
        },
    }
}
const textElement = createTextElement('mini-react')
const el = createElement('div', { id: 'div-wrap' }, textElement)

const container = document.querySelector('#root')
const div = document.createElement(el.type)
div.id = el.props.id
container.appendChild(div)

const textNode = document.createTextNode('')
textNode.nodeValue = textElement.props.nodeValue
div.appendChild(textNode)
