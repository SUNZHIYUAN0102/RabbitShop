<template>
  <div class="home-hot">
    <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
      <transition name="fade">
        <ul v-if="goods.length" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <router-link :to="`/product/${item.id}`">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </router-link>
          </li>
        </ul>

        <home-skeleton v-else></home-skeleton>
      </transition>
    </home-panel>
  </div>
</template>


<script>
import homePanel from "./home-panel.vue";
import homeSkeleton from "./home-skeleton.vue";
import { findHot } from "@/api/home.js";
import { ref } from "vue";
export default {
  setup() {
    const goods = ref([]);
    findHot().then((data) => {
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

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>