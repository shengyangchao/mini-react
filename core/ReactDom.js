import React from './React.js'
const ReactDom = {
    createRoot(container) {
        return {
            render(el) {
                React.renderDom(container, el)
            },
        }
    },
}
export default ReactDom
