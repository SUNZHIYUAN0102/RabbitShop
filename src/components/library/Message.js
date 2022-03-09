import { createVNode, render } from 'vue'
import xtxMessage from './xtx-message.vue'

const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
let timer = null

export default ({ type, text }) => {
    const vnode = createVNode(xtxMessage, { type, text })
    render(vnode, div)
    clearTimeout(timer)
    timer = setTimeout(() => {
        render(null, div)
    }, 3000);
}