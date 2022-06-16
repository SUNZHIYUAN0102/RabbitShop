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

export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
  return request('/member/order', 'get', { page, pageSize, orderState })
}

export const cancelOrder = ({ orderId, cancelReason }) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

export const deleteOrder = ({ id }) => {
  return request('/member/order', 'delete', { ids: [id] })
}

export const confirmOrder = ({ id }) => {
  return request(`/member/order/${id}/receipt`, 'put')
}

export const logisticsOrder = ({ id }) => {
  return request(`/member/order/${id}/logistics`, 'get')
}
