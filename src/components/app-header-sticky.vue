<template>
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <div class="container" v-show="y >= 78">
      <router-link class="logo" to="/"></router-link>
      <app-header-nav></app-header-nav>
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useWindowScroll } from "@vueuse/core";
import appHeaderNav from "./app-header-nav.vue";
export default {
  components: { appHeaderNav },
  setup() {
    const { y } = useWindowScroll();
    return { y };
  },

  //   setup() {
  //     const y = ref(0);
  //     onMounted(() => {
  //       window.onscroll = () => {
  //         const scrollTop = document.documentElement.scrollTop;
  //         y.value = scrollTop;
  //       };
  //     });

  //     return {
  //       y,
  //     };
  //   },
};
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transform: none;
    opacity: 1;
    transition: all 0.3s linear;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>