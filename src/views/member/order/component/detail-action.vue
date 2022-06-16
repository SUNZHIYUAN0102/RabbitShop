<template>
  <div class="detail-action" v-if="order">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>{{ orderStatus[order.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ order.id }}</p>
      <p>下单时间：{{ order.createTime }}</p>
    </div>
    <div class="btn">
      <template v-if="order.orderState === 1">
        <xtx-button
          @click="$router.push('/member/pay?id=' + order.id)"
          type="primary"
          size="small"
          >立即付款</xtx-button
        >
        <xtx-button @click="handleCancel(order)" type="gray" size="small"
          >取消订单</xtx-button
        >
      </template>

      <template v-if="order.orderState === 2">
        <xtx-button type="primary" size="small">再次购买</xtx-button>
      </template>

      <template v-if="order.orderState === 3">
        <xtx-button @click="handleConfirm(order)" type="primary" size="small"
          >确认收货</xtx-button
        >
        <xtx-button type="plain" size="small">再次购买</xtx-button>
      </template>

      <template v-if="order.orderState === 4">
        <xtx-button type="primary" size="small">再次购买</xtx-button>
        <xtx-button type="plain" size="small">评价商品</xtx-button>
        <xtx-button type="gray" size="small">申请售后</xtx-button>
      </template>

      <template v-if="order.orderState === 5">
        <xtx-button type="primary" size="small">再次购买</xtx-button>
        <xtx-button type="plain" size="small">查看评价</xtx-button>
        <xtx-button type="gray" size="small">申请售后</xtx-button>
      </template>
    </div>
    <Teleport to="#model">
      <order-cancel ref="orderCancelCom"></order-cancel>
    </Teleport>
  </div>
</template>

<script>
import { orderStatus } from '@/api/constant'
import orderCancel from './order-cancel.vue'
import { useCancel, useConfirm } from '../index.vue'
export default {
  components: {
    orderCancel
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  setup () {
    return {
      orderStatus,
      ...useCancel(),
      ...useConfirm()
    }
  }
}
</script>

<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
