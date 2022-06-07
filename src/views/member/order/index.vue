<template>
  <div class="member-order">
    <xtx-tabs v-model="activeName" @tab-click="changeTab">
      <xtx-tabs-panel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        >{{ item.label }}</xtx-tabs-panel
      >
    </xtx-tabs>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import { orderStatus } from '@/api/constant'
export default {
  setup () {
    const activeName = ref('all')
    return {
      activeName,
      orderStatus
    }
  }
}
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
}
</style>
