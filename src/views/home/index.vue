<template>
  <div class="home-entry">
    <div class="container">
      <home-category></home-category>
      <home-banner></home-banner>
    </div>
    <home-pannel title="suck my dick" subTitle="fuckin noob">
      <template #right>
        <xtx-more></xtx-more>
      </template>
    </home-pannel>
  </div>
</template>

<script>
import homeCategory from "./components/home-category.vue";
import homeBanner from "./components/home-banner.vue";
import homePannel from "./components/home-panel.vue";
export default {
  setup() {},
  components: {
    homeCategory,
    homeBanner,
    homePannel,
  },
};
</script>

<style scoped lang="less">
</style>