<template>
  <div class="sub-category">
    <div class="container">
      <sub-bread></sub-bread>
      <sub-filter></sub-filter>
      <div class="goods-list">
        <sub-sort @sort-change="sortChange"></sub-sort>
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <goods-item :goods="goods" />
          </li>
        </ul>
        <xtx-infinite-loading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import subBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import subSort from "./components/sub-sort.vue";
import goodsItem from "./components/goods-item.vue";
import { reactive, ref, watch } from "vue";
import { findSubCategoryGoods } from "@/api/category.js";
import { useRoute } from "vue-router";
export default {
  setup() {
    const loading = ref(false);
    const finished = ref(false);

    const route = useRoute();

    let reqParams = {
      page: 1,
      pageSize: 20,
    };

    const goodsList = ref([]);
    const getData = () => {
      loading.value = true;
      reqParams.categoryId = route.params.id;
      findSubCategoryGoods(reqParams).then((data) => {
        if (data.result.items.length) {
          goodsList.value.push(...data.result.items);
          reqParams.page++;
        } else {
          finished.value = true;
        }
        loading.value = false;
      });
    };

    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` == route.path) {
          finished.value = false;
          goodsList.value = [];
          reqParams = {
            page: 1,
            pageSize: 20,
          };
        }
      },
      { immediate: true }
    );

    const sortChange = (sortParams) => {
      finished.value = false;
      reqParams = { ...reqParams, ...sortParams };
      reqParams.page = 1;
      goodsList.value = [];
    };

    return {
      getData,
      loading,
      finished,
      goodsList,
      sortChange,
    };
  },
  components: {
    subBread,
    SubFilter,
    subSort,
    goodsItem,
  },
};
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>