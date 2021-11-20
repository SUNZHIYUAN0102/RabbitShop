<template>
  <div class="home-banner">
    <xtx-carousel :auto-play="true" :sliders="sliders"></xtx-carousel>
  </div>
</template>
<script>
import { findBanner } from "@/api/home.js";
import { ref } from "vue";
export default {
  setup() {
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
    });

    return {
      sliders,
    };
  },
};
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>