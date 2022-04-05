import defaultImg from '@/assets/images/200.png'
import Message from './Message.js'

const importFn = require.context('./', false, /\.vue$/)

export default {
    install(app) {
        importFn.keys().forEach(path => {
            const component = importFn(path).default

            app.component(component.name, component)
        })

        defineDirective(app)
        app.config.globalProperties.$message = Message
    }
}

const defineDirective = (app) => {
    app.directive('lazyload', {
        mounted(el, binding) {
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) {
                    observer.unobserve(el)
                    el.onerror = () => {
                        el.src = defaultImg
                    }
                    el.src = binding.value
                }
            }, {
                threshold: 0.01
            })
            observer.observe(el)
        }
    })
}