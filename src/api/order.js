import request from '@/utils/request'

export const createOrder = () => {
    return request('/member/order/pre', 'get')
}

export const addAddress = (form) => {
    return request('/member/address', 'post', form)
}

export const editAddress = (form) => {
    return request(`/member/address/${form.id}`, 'put', form)
}

export const submitOrder = (params) => {
    return request('/member/order', 'post', params)
}

export const findOrderDetail = (orderId) => {
    return request(`/member/order/${orderId}`, 'get')
}