<template>
  <app-navbar></app-navbar>
  <header>2</header>
  <div class="main">
    <router-view></router-view>
  </div>
  <footer>3</footer>
</template>

<script>
import appNavbar from "../components/app-navbar.vue";
export default {
  setup() {},
  components:{
    appNavbar
  }
};
</script>

<style scoped lang="less">
</style>