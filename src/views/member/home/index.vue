<template>
  <div class="member-home">
    <home-overview></home-overview>
    <home-panel title="我的收藏">
      <goods-item v-for="i in 4" :key="i" :goods="goods"></goods-item>
    </home-panel>
    <home-panel title="我的足迹">
      <goods-item v-for="i in 4" :key="i" :goods="goods"></goods-item>
    </home-panel>
    <goods-relevant></goods-relevant>
  </div>
</template>
<script>
import homeOverview from "./components/home-overview.vue";
import homePanel from "./components/home-panel.vue";
import goodsRelevant from "@/views/goods/components/goods-relevant.vue";
import goodsItem from "@/views/category/components/goods-item.vue";
import request from "@/utils/request";
export default {
  components: {
    homeOverview,
    homePanel,
    goodsRelevant,
    goodsItem,
  },
  setup() {
    const goods = {
      id: "1",
      name: "自煮火锅不排队 麦饭石不粘鸳鸯火锅",
      picture:
        "https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg",
      desc: "清汤鲜香 红汤劲爽",
      price: "159.00",
    };

    request('/my/test','get').then(data=>{
      console.log(data);
    })

    return {
      goods,
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