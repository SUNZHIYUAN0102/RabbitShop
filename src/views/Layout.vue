<template>
  <app-navbar></app-navbar>
  <app-header></app-header>
  <div class="main">
    <router-view></router-view>
  </div>
  <footer>3</footer>
</template>

<script>
import appNavbar from "../components/app-navbar.vue";
import appHeader from "../components/app-header.vue";
export default {
  setup() {},
  components:{
    appNavbar,
    appHeader
  }
};
</script>

<style scoped lang="less">
</style>