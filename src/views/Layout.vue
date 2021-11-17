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
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    store.dispatch("category/getList");
  },
  components: {
    appNavbar,
    appHeader,
  },
};
</script>

<style scoped lang="less">
</style>