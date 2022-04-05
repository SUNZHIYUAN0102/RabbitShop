<template>
  <div class="member-home">
    <home-overview></home-overview>
    <home-panel title="我的收藏">
      <goods-item v-for="item in collectGoods" :key="item.id" :goods="item"></goods-item>
    </home-panel>
    <home-panel title="我的足迹">
      <goods-item v-for="item in collectGoods" :key="item.id" :goods="item"></goods-item>
    </home-panel>
    <goods-relevant></goods-relevant>
  </div>
</template>
<script>
import homeOverview from "./components/home-overview.vue";
import homePanel from "./components/home-panel.vue";
import goodsRelevant from "@/views/goods/components/goods-relevant.vue";
import goodsItem from "@/views/category/components/goods-item.vue";
import { findCollect } from "@/api/member.js";
import { ref } from "vue-demi";
export default {
  components: {
    homeOverview,
    homePanel,
    goodsRelevant,
    goodsItem,
  },
  setup() {
    const collectGoods = ref(null);
    findCollect({ page: 1, pageSize: 4 }).then((data) => {
      collectGoods.value = data.result.items;
    });

    return {
      collectGoods,
    };
  },
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