<template>
  <div class="sub-category">
    <div class="container">
      <sub-bread></sub-bread>
      <sub-filter></sub-filter>
      <div class="goods-list">
        <sub-sort></sub-sort>
      </div>
    </div>
  </div>
</template>

<script>
import subBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import subSort from "./components/sub-sort.vue";
import { ref } from "vue";
export default {
  setup() {
    const isAllChecked = ref(true);

    return {
      isAllChecked,
    };
  },
  components: {
    subBread,
    SubFilter,
    subSort,
  },
};
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>