import { useIntersectionObserver } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import { useIntervalFn } from "@vueuse/shared";
import dayjs from "dayjs";

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


export const usePayTime = () => {
    const time = ref(0);
    const timeText = ref("");
    const { pause, resume } = useIntervalFn(
        () => {
            time.value--;
            timeText.value = dayjs.unix(time.value).format("mm分ss秒");
            if (time.value <= 0) {
                pause();
            }
        },
        1000,
        false
    );
    onUnmounted(() => {
        pause();
    });

    const start = (countDown) => {
        time.value = countDown;
        timeText.value = dayjs.unix(time.value).format("mm分ss秒");
        resume()
    }
    return {
        start,
        timeText
    }
};