import React from './core/React.js'
const App = () => {
    return (
        <div>
            123<div>444</div>
            <FuncApp count={10} />
            <FuncApp count={20} />
        </div>
    )
}
function FuncApp({ count }) {
    return <div>aaa{count}</div>
}

export default App
