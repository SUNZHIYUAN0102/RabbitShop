<template>
  <Form
    :validation-schema="mySchema"
    autocomplete="off"
    v-slot="{ errors }"
    class="xtx-form"
    ref="formCom"
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
        <span @click="send()" class="code">
          {{ time === 0 ? "发送验证码" : `${time}秒后发送` }}
        </span>
      </div>
      <div v-if="errors.code" class="error">{{ errors.code }}</div>
    </div>
    <a @click="submit()" href="javascript:;" class="submit">立即绑定</a>
  </Form>
</template>

<script>
import QC from "qc";
import { onUnmounted, reactive, ref } from "vue-demi";
import { Form, Field } from "vee-validate";
import schema from "@/utils/vee-validate-schema";
import { userQQBindCode, userQQBindLogin } from "@/api/user";
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
    const nickname = ref(null);
    const avatar = ref(null);
    const store = useStore();
    const router = useRouter();
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
          await userQQBindCode(form.mobile);
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
        userQQBindLogin(props.unionId, form.mobile, form.code)
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

            store.dispatch("cart/mergeCart").then(() => {
              router.push(store.state.user.redirectUrl);
              Message({ type: "success", text: "QQ登录成功" });
            });
          })
          .catch((e) => {
            Message({ type: "error", text: "绑定失败" });
          });
      } else {
        if (e.response.data) {
          Message({
            type: "error",
            text: e.response.data.message || "登录失败",
          });
        }
      }
    };
    return {
      nickname,
      avatar,
      mySchema,
      form,
      send,
      formCom,
      time,
      submit,
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