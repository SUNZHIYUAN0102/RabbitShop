<template>
  <app-navbar></app-navbar>
  <app-header></app-header>
  <appheader-nav-sticky></appheader-nav-sticky>
  <main class="app-body">
    <router-view></router-view>
  </main>
  <app-footer></app-footer>
</template>

<script>
import appNavbar from "../components/app-navbar.vue";
import appHeader from "../components/app-header.vue";
import appFooter from "../components/app-footer.vue";
import appheaderNavSticky from "../components/app-header-sticky.vue"
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    store.dispatch("category/getList");
  },
  components: {
    appNavbar,
    appHeader,
    appFooter,
    appheaderNavSticky
  },
};
</script>

<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>