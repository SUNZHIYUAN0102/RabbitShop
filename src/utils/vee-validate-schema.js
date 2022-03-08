export default {
    account(value) {
        if (!value) return "请输入用户名";
        if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符';
        return true;
    },

    password(value) {
        if (!value) return "请输入密码";
        if (!/^\w{6,24}$/.test(value)) return '密码格式6-24个字符';

        return true
    },

    mobile(value) {
        if (!value) return "请输入手机号";
        if (!/^1[3-9]{1}[0-9]{9}$/.test(value)) return '手机号格式不对';
        return true
    },

    code(value) {
        if (!value) return "请输入验证码";
        if (!/^[0-9]{6}$/.test(value)) return '验证码为6位数字';
        return true
    },

    isAgree(value) {
        if (!value) return "请勾选用户协议";
        return true
    }
}