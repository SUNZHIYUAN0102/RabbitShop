<template>
  <div class="home-entry">
    <div class="container">
      <home-category></home-category>
      <home-banner></home-banner>
    </div>
    <home-new></home-new>
    <home-hot></home-hot>
    <home-brand></home-brand>
    <home-product></home-product>
    <home-special></home-special>
  </div>
</template>

<script>
import homeCategory from "./components/home-category.vue";
import homeBanner from "./components/home-banner.vue";
import homeNew from "./components/home-new.vue";
import homeHot from "./components/home-hot.vue";
import homeBrand from "./components/home-brand.vue";
import homeProduct from "./components/home-product.vue";
import homeSpecial from "./components/home-special.vue";
export default {
  setup() {},
  components: {
    homeCategory,
    homeBanner,
    homeNew,
    homeHot,
    homeBrand,
    homeProduct,
    homeSpecial,
  },
};
</script>

<style scoped lang="less">
</style>