<template>
  <xtx-dialog title="取消订单" v-model:visible="visibleDialog">
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          @click="curText = item"
          v-for="item in cancelReason"
          :key="item"
          href="javascript:;"
          :class="{ active: curText === item }"
        >
          {{ item }}
        </a>
      </div>
    </div>
    <template v-slot:footer>
      <xtx-button
        type="gray"
        @click="visibleDialog = false"
        style="margin-right: 20px"
        >取消</xtx-button
      >
      <xtx-button type="primary" @click="submit">确认</xtx-button>
    </template>
  </xtx-dialog>
</template>

<script>
import { ref } from 'vue-demi'
import { cancelReason } from '@/api/constant'
import { cancelOrder } from '@/api/order'
import Message from '@/components/library/Message'
export default {
  setup () {
    const visibleDialog = ref(false)
    const curText = ref('')
    const currOrder = ref(null)
    const submit = () => {
      if (!curText.value) return Message({ text: '请选择取消原因' })
      cancelOrder({
        orderId: currOrder.value.id,
        cancelReason: curText.value
      }).then(() => {
        currOrder.value.orderState = 6
        visibleDialog.value = false
        Message({ type: 'success', text: '取消订单成功' })
      })
    }

    const open = (order) => {
      visibleDialog.value = true
      currOrder.value = order
    }

    return {
      visibleDialog,
      cancelReason,
      curText,
      submit,
      open
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-dialog :deep(.wrapper) {
  width: 620px !important;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>
