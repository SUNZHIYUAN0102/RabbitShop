<template>
  <Form
    class="xtx-form"
    autocomplete="off"
    :validation-schema="mySchema"
    v-slot="{ errors }"
    ref="formCom"
  >
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-user"></i>
        <Field
          name="account"
          class="input"
          type="text"
          v-model="form.account"
          placeholder="请输入用户名"
          :class="{ err: errors.account }"
        />
      </div>
      <div class="error" v-if="errors.account">{{ errors.account }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          name="mobile"
          class="input"
          type="text"
          v-model="form.mobile"
          placeholder="请输入手机号"
          :class="{ err: errors.mobile }"
        />
      </div>
      <div class="error" v-if="errors.mobile">{{ errors.mobile }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          name="code"
          class="input"
          type="text"
          v-model="form.code"
          placeholder="请输入验证码"
          :class="{ err: errors.code }"
        />
        <span @click="send()" class="code">
          {{ time === 0 ? "发送验证码" : `${time}秒后发送` }}</span
        >
      </div>
      <div class="error" v-if="errors.code">{{ errors.code }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          name="password"
          class="input"
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          :class="{ err: errors.password }"
        />
      </div>
      <div class="error" v-if="errors.password">{{ errors.password }}</div>
    </div>
    <div class="xtx-form-item">
      <div class="field">
        <i class="icon iconfont icon-lock"></i>
        <Field
          name="rePassword"
          class="input"
          type="password"
          v-model="form.rePassword"
          placeholder="请确认密码"
          :class="{ err: errors.rePassword }"
        />
      </div>
      <div class="error" v-if="errors.rePassword">{{ errors.rePassword }}</div>
    </div>
    <a @click="submit" href="javascript:;" class="submit">立即提交</a>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
import { onUnmounted, reactive, ref } from "vue-demi";
import schema from "@/utils/vee-validate-schema";
import { userQQPatchCode, userQQPatchLogin } from "@/api/user";
import { useIntervalFn } from "@vueuse/shared";
import Message from "@/components/library/Message";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
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
  setup(props) {
    const form = reactive({
      mobile: null,
      code: null,
      account: null,
      password: null,
      rePassword: null,
    });

    const store = useStore();
    const router = useRouter();

    const mySchema = {
      mobile: schema.mobile,
      code: schema.code,
      account: schema.accountApi,
      password: schema.password,
      rePassword: schema.rePassword,
    };

    const formCom = ref(null);

    const time = ref(0);
    const { pause, resume } = useIntervalFn(
      () => {
        time.value--;
        if (time.value <= 0) {
          pause();
        }
      },
      1000,
      false
    );
    onUnmounted(() => {
      pause();
    });
    const send = async () => {
      const valid = schema.mobile(form.mobile);
      if (valid === true) {
        if (time.value === 0) {
          await userQQPatchCode(form.mobile);
          Message({ type: "success", text: "发送成功" });
          time.value = 60;
          resume();
        }
      } else {
        formCom.value.setFieldError("mobile", valid);
      }
    };

    const submit = () => {
      const valid = formCom.value.validate();
      if (valid) {
        userQQPatchLogin(
          props.unionId,
          form.account,
          form.mobile,
          form.code,
          form.password
        )
          .then((data) => {
            const { id, account, avatar, mobile, nickname, token } =
              data.result;
            store.commit("user/setUser", {
              id,
              account,
              avatar,
              mobile,
              nickname,
              token,
            });

            router.push(store.state.user.redirectUrl);
            Message({ type: "success", text: "QQ登录成功" });
          })
          .catch((e) => {
            Message({ type: "error", text: "完善信息失败" });
          });
      }
    };

    return {
      form,
      mySchema,
      formCom,
      time,
      send,
      submit,
    };
  },
};
</script>

<style scoped lang='less'>
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
