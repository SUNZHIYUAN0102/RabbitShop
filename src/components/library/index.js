import xtxSkeleton from './xtx-skeleton.vue'
import xtxCarousel from './xtx-carousel.vue'
import xtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'
import xtxBread from './xtx-bread.vue'

export default {
    install(app) {
        app.component('xtxSkeleton', xtxSkeleton);
        app.component('xtxCarousel', xtxCarousel);
        app.component('xtxMore', xtxMore);
        app.component('xtxBread', xtxBread);

        defineDirective(app)
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