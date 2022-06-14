<template>
  <div class="member-order-detail">
    <detail-action :order="order"></detail-action>
    <detail-step :order="order"></detail-step>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import detailAction from './component/detail-action.vue'
import detailStep from './component/detail-step.vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
export default {
  components: {
    detailAction,
    detailStep
  },
  setup () {
    const order = ref(null)
    const route = useRoute()
    findOrderDetail(route.params.id).then((data) => {
      order.value = data.result
    })
    return {
      order
    }
  }
}
</script>

<style lang="less" scoped>
.member-order-detail {
  background: #fff;
  height: 100%;
}
</style>
