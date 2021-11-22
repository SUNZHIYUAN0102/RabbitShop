<template>
  <div class="home-entry">
    <div class="container">
      <home-category></home-category>
      <home-banner></home-banner>
    </div>
    <home-new></home-new>
    <home-hot></home-hot>
    <home-brand></home-brand>
  </div>
</template>

<script>
import homeCategory from "./components/home-category.vue";
import homeBanner from "./components/home-banner.vue";
import homeNew from "./components/home-new.vue";
import homeHot from "./components/home-hot.vue";
import homeBrand from "./components/home-brand.vue";
export default {
  setup() {},
  components: {
    homeCategory,
    homeBanner,
    homeNew,
    homeHot,
    homeBrand,
  },
};
</script>

<style scoped lang="less">
</style>