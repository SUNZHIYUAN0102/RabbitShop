<template>
  <div class="home-entry">
    <div class="container">
      <home-category></home-category>
      <home-banner></home-banner>
    </div>
  </div>
</template>

<script>
import homeCategory from './components/home-category.vue'
import homeBanner from './components/home-banner.vue'
export default {
  setup() {
    
  },
  components:{
    homeCategory,
    homeBanner
  }
}
</script>

<style scoped lang="less">

</style>