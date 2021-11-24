<template>
  <div class="top-category">
    <div class="container">
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item v-if="topCategory">{{
          topCategory.name
        }}</xtx-bread-item>
      </xtx-bread>

      <xtx-carousel :sliders="sliders" :autoPlay="true" style="height: 500px" />
      <div class="sub-list" v-if="topCategory && topCategory.children">
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
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { findBanner } from "@/api/home.js";
export default {
  setup() {
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
    });

    const store = useStore();
    const route = useRoute();
    const topCategory = computed(() => {
      return store.state.category.list.find((item) => 
         item.id === route.params.id
      );
    });

    return {
      sliders,
      topCategory,
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
</style>