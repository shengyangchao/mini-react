//v-dom写死 渲染写死
const container = document.querySelector('#root')
const div = document.createElement('div')
div.id = 'div-wrap'
container.appendChild(div)

const textNode = document.createTextNode('')
textNode.nodeValue = 'mini-react'
div.appendChild(textNode)
