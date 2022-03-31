<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-if="showAddress">
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li>
          <span>联系方式：</span
          >{{ showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})/, "$1****$2") }}
        </li>
        <li>
          <span>收货地址：</span>{{ showAddress.fullLocation
          }}{{ showAddress.address }}
        </li>
      </ul>
      <a v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <xtx-button @click="openDialog" class="btn">切换地址</xtx-button>
      <xtx-button @click="openAddressEdit" class="btn">添加地址</xtx-button>
    </div>
  </div>
  <xtx-dialog title="切换收货地址" v-model:visible="visible">
    <div
      @click="selectedAddress = item"
      :class="{ active: selectedAddress && selectedAddress.id == item.id }"
      class="text item"
      v-for="item in list"
      :key="item.id"
    >
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ item.receiver }}
        </li>
        <li><span>联系方式：</span>{{ item.contact }}</li>
        <li>
          <span>收货地址：</span
          >{{ item.fullLocation.replace(/ /g, "") + item.address }}
        </li>
      </ul>
    </div>
    <template v-slot:footer>
      <xtx-button
        @click="visible = false"
        type="gray"
        style="margin-right: 20px"
        >取消</xtx-button
      >
      <xtx-button @click="confirmAddress" type="primary">确认</xtx-button>
    </template>
  </xtx-dialog>
  <address-edit @on-success="successHandle" ref="addressEditCom"></address-edit>
</template>
<script>
import { ref } from "vue-demi";
import addressEdit from "./address-edit.vue";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    addressEdit,
  },
  emits: ["change"],
  setup(props, { emit }) {
    const showAddress = ref(null);
    const defaultAddress = props.list.find((item) => item.isDefault === 0);
    const visible = ref(false);

    if (defaultAddress) {
      showAddress.value = defaultAddress;
    } else {
      if (props.list.length) {
        showAddress.value = props.list[0];
      }
    }

    emit("change", showAddress.value && showAddress.value.id);
    const selectedAddress = ref(null);

    const confirmAddress = () => {
      showAddress.value = selectedAddress.value;
      emit("change", showAddress.value.id);
      visible.value = false;
    };

    const openDialog = () => {
      selectedAddress.value = null;
      visible.value = true;
    };

    const addressEditCom = ref(null);
    const openAddressEdit = () => {
      addressEditCom.value.open();
    };

    const successHandle = (formData) => {
      const jsonStr = JSON.stringify(formData)

      props.list.unshift(JSON.parse(jsonStr));
    };

    return {
      showAddress,
      visible,
      selectedAddress,
      confirmAddress,
      openDialog,
      openAddressEdit,
      addressEditCom,
      successHandle,
    };
  },
};
</script>
<style scoped lang="less">
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>