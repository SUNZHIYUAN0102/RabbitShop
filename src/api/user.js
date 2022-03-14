import request from "@/utils/request";

export const userAccountLogin = (account, password) => {
    return request('/login', 'post', { account, password })
}

export const userMobileLoginMsg = (mobile) => {
    return request('/login/code', 'get', { mobile })
}

export const userMobileLogin = (mobile, code) => {
    return request('/login/code', 'post', { mobile, code })
}

export const userQQLogin = (unionId) => {
    return request('login/social', 'post', { unionId, source: 1 })
}