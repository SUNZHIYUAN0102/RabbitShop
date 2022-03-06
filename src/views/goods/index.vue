<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</xtx-bread-item>

        <xtx-bread-item :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</xtx-bread-item>

        <xtx-bread-item>{{ goods.name }}</xtx-bread-item>
      </xtx-bread>
      <div class="goods-info">
        <div class="media">
          <goods-image :images="goods.mainPictures"></goods-image>
          <goods-sale></goods-sale>
        </div>
        <div class="spec">
          <goods-name :goods="goods"></goods-name>
          <goods-sku
            :goods="goods"
            :skuId="goods.skus[0].id"
            @change="changeSku"
          ></goods-sku>
          <xtx-numbox v-model="count" :max="goods.inventory"></xtx-numbox>
          <xtx-button type="primary" style="margin-top: 20px"
            >加入购物车</xtx-button
          >
        </div>
      </div>

      <goods-relevant :goodsId="goods.id"></goods-relevant>
      <div class="goods-footer">
        <div class="goods-article">
          <goods-tab></goods-tab>
          <goods-warn></goods-warn>
        </div>
        <div class="goods-aside">
          <goods-hot></goods-hot>
          <goods-hot :type="2"></goods-hot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, provide, ref, watch } from "vue";
import { findGoods } from "@/api/product.js";
import goodsRelevant from "./components/goods-relevant.vue";
import { useRoute } from "vue-router";
import goodsImage from "./components/goods-image.vue";
import goodsSale from "./components/goods-sales.vue";
import goodsName from "./components/goods-name.vue";
import goodsSku from "./components/goods-sku.vue";
import goodsTab from "./components/goods-tab.vue";
import goodsHot from "./components/goods-hot.vue";
import goodsWarn from './components/goods-warn.vue'
export default {
  components: {
    goodsRelevant,
    goodsImage,
    goodsSale,
    goodsName,
    goodsSku,
    goodsTab,
    goodsHot,
    goodsWarn
  },

  setup() {
    const goods = useGoods();

    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price;
        goods.value.oldPrice = sku.oldPrice;
        goods.value.inventory = sku.inventory;
      }
    };

    provide("goods", goods)

    const count = ref(1);
    console.log(count);
    return {
      goods,
      changeSku,
      count,
    };
  },
};

const useGoods = () => {
  const goods = ref(null);
  const route = useRoute();
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
          goods.value = null;
          nextTick(() => {
            goods.value = data.result;
          });
        });
      }
    },
    { immediate: true }
  );

  return goods;
};
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>