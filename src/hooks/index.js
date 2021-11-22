import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

export const useLazyData = (apiFn) => {
    const target = ref(null)
    const result = ref([])
    const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }], observerElement) => {
            if (isIntersecting) {
                stop()
                apiFn().then(data => {
                    result.value = data.result
                })
            }
        }, {
            threshold: 0
        }
    )

    return { target, result }
}