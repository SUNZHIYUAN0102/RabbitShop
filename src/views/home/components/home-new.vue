<template>
  <div class="home-new">
    <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <xtx-more path="/"></xtx-more>
      </template>

      <transition name="fade">
        <ul v-if="goods.length" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <router-link :to="`/product/${item.id}`">
              <img :src="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </router-link>
          </li>
        </ul>

        <home-skeleton bg="f0f9f4" v-else></home-skeleton>
      </transition>
    </home-panel>
  </div>
</template>

<script>
import homePanel from "./home-panel.vue";
import homeSkeleton from "./home-skeleton.vue";
import { findNew } from "@/api/home.js";
import { ref } from "vue";
export default {
  setup() {
    const goods = ref([]);
    findNew().then((data) => {
      goods.value = data.result;
    });

    return {
      goods,
    };
  },
  components: {
    homePanel,
    homeSkeleton,
  },
};
</script>

<style scoped lang="less">
.fade {
  &-leave {
    &-active {
      position: absolute;
      width: 100%;
      transition: opacity .5s 0.2s;
      z-index: 1;
    }
    &-to {
      opacity: 0;
    }
  }
}
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>