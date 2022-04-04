<template>
  <div class="member-home">
    <home-overview></home-overview>
    <home-panel title="我的收藏"></home-panel>
    <home-panel title="我的足迹"></home-panel>
    <goods-relevant></goods-relevant>
  </div>
</template>
<script>
import homeOverview from './components/home-overview.vue'
import homePanel from './components/home-panel.vue'
import goodsRelevant from '@/views/goods/components/goods-relevant.vue'
export default {
  components:{
    homeOverview,
    homePanel,
    goodsRelevant
  },
  setup() {},
};
</script>

<style lang="less" scoped>
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>