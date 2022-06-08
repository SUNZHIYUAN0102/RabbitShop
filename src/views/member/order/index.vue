<template>
  <div class="member-order">
    <xtx-tabs v-model="activeName" @tab-click="tabClick">
      <xtx-tabs-panel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      ></xtx-tabs-panel>
    </xtx-tabs>

    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <order-item
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      ></order-item>
    </div>

    <xtx-pagination
      v-if="total"
      :currentPaze="reqParams.page"
      :pageSize="reqParams.pageSize"
      :total="total"
      @current-change="reqParams.page = $event"
    ></xtx-pagination>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue-demi'
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

    const loading = ref(false)

    const total = ref(0)

    watch(
      reqParams,
      () => {
        loading.value = true
        findOrderList(reqParams).then((data) => {
          orderList.value = data.result.items
          total.value = data.result.counts
          loading.value = false
        })
      },
      { immediate: true }
    )

    const tabClick = ({ index }) => {
      reqParams.page = 1
      reqParams.orderState = index
      orderList.value = []
      total.value = 0
    }

    const orderList = ref([])

    return {
      activeName,
      orderStatus,
      orderList,
      tabClick,
      loading,
      total,
      reqParams
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
  position: relative;
}
.loading {
  height: 100%;
  width: 100%;
  min-height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
