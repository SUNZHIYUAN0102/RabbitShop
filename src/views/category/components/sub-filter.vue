<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          :class="{ active: item.id === filterData.brands.selectedBrand }"
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
          @click="changeBrand(item.id)"
          >{{ item.name }}</a
        >
      </div>
    </div>

    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a
          href="javascript:;"
          @click="changeProp(item, prop.id)"
          :class="{ active: prop.id === item.selectedAttr }"
          v-for="prop in item.properties"
          :key="prop.id"
          >{{ prop.name }}</a
        >
      </div>
    </div>
  </div>

  <div v-else class="sub-filter">
    <xtx-skeleton class="item" width="800px" height="40px" />
    <xtx-skeleton class="item" width="800px" height="40px" />
    <xtx-skeleton class="item" width="600px" height="40px" />
    <xtx-skeleton class="item" width="600px" height="40px" />
    <xtx-skeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { findSubCategoryFilter } from "@/api/category.js";
export default {
  setup(props, { emit }) {
    const filterData = ref(null);
    const filterLoading = ref(false);
    const route = useRoute();
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          filterLoading.value = true;
          findSubCategoryFilter(route.params.id).then((data) => {
            data.result.brands.selectedBrand = null;
            data.result.brands.unshift({ id: null, name: "全部" });

            data.result.saleProperties.forEach((item) => {
              item.selectedAttr = null;
              item.properties.unshift({ id: null, name: "全部" });
            });

            filterData.value = data.result;
            filterLoading.value = false;
          });
        }
      },
      {
        immediate: true,
      }
    );

    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] };
      obj.brandId = filterData.value.brands.selectedBrand;
      filterData.value.saleProperties.forEach((item) => {
        if (item.selectedAttr) {
          const prop = item.properties.find(
            (prop) => prop.id == item.selectedAttr
          );

          obj.attrs.push({ groupName: item.name, propertyName: prop.name });
        }
      });
      if (obj.attrs.length === 0) obj.attrs = null;
      return obj;
    };

    const changeBrand = (brandId) => {
      if (filterData.value.brands.selectedBrand === brandId) return;
      filterData.value.brands.selectedBrand = brandId;
      emit("filter-change", getFilterParams());
    };

    const changeProp = (item, propId) => {
      if (item.selectedAttr === propId) return;
      item.selectedAttr = propId;
      emit("filter-change", getFilterParams());
    };

    return {
      filterData,
      filterLoading,
      changeBrand,
      changeProp,
    };
  },
};
</script>
<style scoped lang='less'>
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>