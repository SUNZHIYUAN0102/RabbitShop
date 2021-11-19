import xtxSkeleton from './xtx-skeleton.vue'
import xtxCarousel from './xtx-carousel.vue'

export default {
    install(app) {
        app.component('xtxSkeleton', xtxSkeleton);
        app.component('xtxCarousel', xtxCarousel);
    }
}