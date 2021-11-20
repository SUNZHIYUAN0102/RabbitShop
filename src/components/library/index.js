import xtxSkeleton from './xtx-skeleton.vue'
import xtxCarousel from './xtx-carousel.vue'
import xtxMore from './xtx-more.vue'

export default {
    install(app) {
        app.component('xtxSkeleton', xtxSkeleton);
        app.component('xtxCarousel', xtxCarousel);
        app.component('xtxMore', xtxMore);
    }
}