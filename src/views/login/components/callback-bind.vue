<template>
  <Form
    :validation-schema="mySchema"
    autocomplete="off"
    v-slot="{ errors }"
    class="xtx-form"
  >
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          v-model="form.mobile"
          name="mobile"
          class="input"
          type="text"
          placeholder="绑定的手机号"
          :class="{ err: errors.mobile }"
        />
      </div>
      <div v-if="errors.mobile" class="error">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          v-model="form.code"
          name="code"
          class="input"
          type="text"
          placeholder="短信验证码"
          :class="{ err: errors.code }"
        />
        <span class="code">发送验证码</span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <a href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from "qc";
import { reactive, ref } from "vue-demi";
import { Form, Field } from "vee-validate";
import schema from "@/utils/vee-validate-schema";
export default {
  props: {
    unionId: {
      type: String,
      default: "",
    },
  },
  components: {
    Form,
    Field,
  },
  setup() {
    const nickname = ref(null);
    const avatar = ref(null);
    QC.api("get_user_info").success((res) => {
      nickname.value = res.data.nickname;
      avatar.value = res.data.figureurl_1;
    });

    const form = reactive({
      mobile: null,
      code: null,
    });

    const mySchema = {
      mobile: schema.mobile,
      code: schema.code,
    };

    return {
      nickname,
      avatar,
      mySchema,
      form
    };
  },
};
</script>

<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>