<template>
  <login-header>联合登录</login-header>
  <section class="container">
    <nav class="tab">
      <a
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <callback-bind></callback-bind>
    </div>
    <div class="tab-content" v-else>
      <callback-patch></callback-patch>
    </div>
  </section>
  <login-footer></login-footer>
</template>

<script>
import loginHeader from "./components/login-header.vue";
import loginFooter from "./components/login-footer.vue";
import callbackBind from './components/callback-bind.vue'
import callbackPatch from './components/callback-patch.vue'
import { ref } from 'vue-demi';
export default {
  name: "loginCallBack",
  components: {
    loginHeader,
    loginFooter,
    callbackBind,
    callbackPatch
  },
  setup() {
      const hasAccount = ref(false)
      return{
          hasAccount
      }
  },
};
</script>

<style scoped lang='less'>
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>