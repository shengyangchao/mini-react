//定义虚拟dom
const textElement = {
    type: 'textNode',
    props: {
        nodeValue: 'mini-react',
        children: [], //为了写代码方便 没有children也加上 children:[]
    },
}
const el = {
    type: 'div',
    props: {
        id: 'div-wrap',
        children: [textElement],
    },
}

const container = document.querySelector('#root')
const div = document.createElement(el.type)
div.id = el.props.id
container.appendChild(div)

const textNode = document.createTextNode('')
textNode.nodeValue = textElement.props.nodeValue
div.appendChild(textNode)
