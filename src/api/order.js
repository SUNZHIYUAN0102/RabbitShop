import request from '@/utils/request'

export const createOrder = () => {
    return request('/member/order/pre', 'get')
}

export const addAddress = (form) => {
    return request('/member/address', 'post', form)
}