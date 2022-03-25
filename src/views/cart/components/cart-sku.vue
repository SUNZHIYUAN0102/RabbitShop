<template>
  <div ref="target" class="cart-sku">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <goods-sku
        @change="changeSku"
        v-if="goods"
        :goods="goods"
        :skuId="skuId"
      ></goods-sku>
      <xtx-button
        v-if="goods"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        @click="submit"
        >确认</xtx-button
      >
      <div v-else class="loading"></div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue-demi";
import { onClickOutside } from "@vueuse/core";
import { getGoodsSku } from "@/api/cart";
import goodsSku from "@/views/goods/components/goods-sku";
export default {
  props: {
    attrsText: {
      type: String,
      default: "",
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  components: {
    goodsSku,
  },
  setup(props, { emit }) {
    const visible = ref(false);

    const goods = ref(null);

    const open = () => {
      visible.value = true;
      getGoodsSku(props.skuId).then((data) => {
        goods.value = data.result;
      });
    };

    const close = () => {
      visible.value = false;
    };

    const toggle = () => {
      visible.value ? close() : open();
    };

    const target = ref(null);

    onClickOutside(target, () => {
      close();
    });

    const currSku = ref(null);
    const changeSku = (sku) => {
      currSku.value = sku;
    };

    const submit = () => {
      if (
        currSku.value &&
        currSku.value.skuId &&
        currSku.value.skuId !== props.skuId
      ) {
        emit("change", currSku.value);
        close()
      }
    };
    return {
      visible,
      toggle,
      target,
      goods,
      changeSku,
      submit,
    };
  },
};
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>