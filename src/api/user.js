import request from "@/utils/request";

export const userAccountLogin = (account, password) => {
    return request('/login', 'post', { account, password })
}