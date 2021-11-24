<template>
  <div class="top-category">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <transition name="fade-right" mode="out-in">
          <xtx-bread-item :key="topCategory.id">{{
            topCategory.name
          }}</xtx-bread-item>
        </transition>
      </xtx-bread>

      <xtx-carousel :sliders="sliders" :autoPlay="true" style="height: 500px" />
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>

      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">品质之选</p>
          <xtx-more :path="`category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <goods-item
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          ></goods-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { findBanner } from "@/api/home.js";
import { findTopCategory } from "@/api/category.js";
import goodsItem from "./components/goods-item.vue";
export default {
  components: {
    goodsItem,
  },
  setup() {
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
    });

    const store = useStore();
    const route = useRoute();
    const topCategory = computed(() => {
      let cate = {};
      const item = store.state.category.list.find(
        (item) => item.id === route.params.id
      );

      if (item) cate = item;
      return cate;
    });

    const subList = ref([]);
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children;
      });
    };

    watch(
      () => route.params.id,
      (newVal) => {
        if(newVal && `/category/${newVal}`===route.path){
            getSubList()
        }
      },
      { immediate: true }
    );

    return {
      sliders,
      topCategory,
      subList,
    };
  },
};
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>