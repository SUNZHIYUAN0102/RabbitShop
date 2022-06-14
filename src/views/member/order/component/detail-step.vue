<template>
  <div v-if="order" class="detail-step">
    <xtx-steps :active="order.orderState === 6 ? 1 : order.orderState">
      <xtx-steps-item title="提交订单" :desc="order.createTime" />
      <xtx-steps-item title="付款成功" :desc="order.payTime" />
      <xtx-steps-item title="商品发货" :desc="order.consignTime" />
      <xtx-steps-item title="确认收货" :desc="order.endTime" />
      <xtx-steps-item title="订单完成" :desc="order.evaluationTime" />
    </xtx-steps>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {}
}
</script>

<style lang="less" scoped>
.detail-step {
  padding: 20px;
}
</style>
