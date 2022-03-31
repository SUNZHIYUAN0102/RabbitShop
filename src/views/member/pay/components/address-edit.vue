<template>
  <xtx-dialog
    :title="`${formData.id ? '修改' : '添加'}收货地址`"
    v-model:visible="visible"
  >
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input
              v-model="formData.receiver"
              class="input"
              placeholder="请输入收货人"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input
              v-model="formData.contact"
              class="input"
              placeholder="请输入手机号"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <xtx-city
              :fullLocation="formData.fullLocation"
              @change="changeCity"
              placeholder="请选择收货地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input
              v-model="formData.address"
              class="input"
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input
              v-model="formData.postCode"
              class="input"
              placeholder="请输入邮政编码"
            />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input
              v-model="formData.addressTags"
              class="input"
              placeholder="请输入地址标签，逗号分隔"
            />
          </div>
        </div>
      </div>
    </div>
    <template v-slot:footer>
      <xtx-button
        @click="visible = false"
        type="gray"
        style="margin-right: 20px"
        >取消</xtx-button
      >
      <xtx-button @click="submit" type="primary">确认</xtx-button>
    </template>
  </xtx-dialog>
</template>

<script>
import { reactive, ref } from "vue-demi";
import { addAddress, editAddress } from "@/api/order";
import Message from "@/components/library/Message";
export default {
  setup(props, { emit }) {
    const visible = ref(false);

    const formData = reactive({
      receiver: "",
      contact: "",
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      address: "",
      postalCode: "",
      addressTags: "",
      isDefault: 1,
      fullLocation: "",
    });

    const open = (address) => {
      visible.value = true;
      if (address.id) {
        for (const key in address) {
          formData[key] = address[key];
        }
      } else {
        for (const key in formData) {
          if (key === "isDefault") {
            formData[key] = 1;
          } else {
            formData[key] = null;
          }
        }
      }
    };

    const changeCity = (result) => {
      (formData.provinceCode = result.provinceCode),
        (formData.cityCode = result.cityCode),
        (formData.countyCode = result.countyCode),
        (formData.fullLocation = result.fullLocation);
    };

    const submit = () => {
      if (formData.id) {
        editAddress(formData).then((data) => {
          Message({ type: "success", text: "修改收货地址成功" });
          visible.value = false;
          emit("on-success", formData);
        });
      } else {
        addAddress(formData).then(() => {
          Message({ type: "success", text: "添加收货地址成功" });
          formData.id = data.result.id;
          visible.value = false;
          emit("on-success", formData);
        });
      }
    };
    return {
      visible,
      open,
      formData,
      changeCity,
      submit,
    };
  },
};
</script>

<style lang="less" scoped>
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
</style>