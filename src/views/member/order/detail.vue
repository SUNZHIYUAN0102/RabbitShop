<template>
  <div class="member-order-detail">
    <detail-action :order="order"></detail-action>
    <detail-step :order="order"></detail-step>
    <template v-if="order">
      <Suspense>
        <template #default>
          <detail-logistic
            v-if="[3, 4, 5].includes(order.orderState)"
            :order="order"
          ></detail-logistic>
        </template>
        <template #fallback><div class="loading">loading....</div></template>
      </Suspense>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import detailAction from './component/detail-action.vue'
import detailStep from './component/detail-step.vue'
import detailLogistic from './component/detail-logistic.vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
export default {
  components: {
    detailAction,
    detailStep,
    detailLogistic
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
.loading {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;
  }
}
</style>
