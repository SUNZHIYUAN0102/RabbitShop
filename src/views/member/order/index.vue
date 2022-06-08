<template>
  <div class="member-order">
    <xtx-tabs v-model="activeName" @tab-click="changeTab">
      <xtx-tabs-panel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></xtx-tabs-panel>
    </xtx-tabs>

    <div class="order-list">
      <order-item
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      ></order-item>
    </div>

    <xtx-pagination></xtx-pagination>
  </div>
</template>

<script>
import { reactive, ref } from 'vue-demi'
import { orderStatus } from '@/api/constant'
import orderItem from './component/order-item.vue'
import { findOrderList } from '@/api/order'
export default {
  components: {
    orderItem
  },
  setup () {
    const activeName = ref('all')

    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderStatus: 0
    })
    const orderList = ref([])

    findOrderList(reqParams).then((data) => {
      orderList.value = data.result.items
    })
    return {
      activeName,
      orderStatus,
      orderList
    }
  }
}
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
}
</style>
