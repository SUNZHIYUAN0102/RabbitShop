<template>
  <div class="xtx-bread">
    <div class="xtx-bread-item">
      <router-link to="/">首页</router-link>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <div class="xtx-bread-item" v-if="parentName">
      <router-link v-if="parentPath" :to="parentPath">{{parentName}}</router-link>
      <span v-else>{{parentName}}</span>
    </div>
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <div class="xtx-bread-item">
      <span><slot/></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    parentPath: {
      type: [String, Object],
      default: "/",
    },
    parentName: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>