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

export const userQQBindCode = (mobile) => {
    return request('/login/social/code', 'get', { mobile })
}

export const userQQBindLogin = (unionId, mobile, code) => {
    return request('/login/social/bind', 'post', { unionId, mobile, code })
}

export const userAccountCheck = (account) => {
    return request('/register/check', 'get', { account })
}

export const userQQPatchCode = (mobile) => {
    return request('/register/code', 'get', { mobile })
}

export const userQQPatchLogin = (unionId, account, mobile, code, password) => {
    return request(`/login/social/${unionId}/complement`, 'post', { unionId, account, mobile, code, password })
}