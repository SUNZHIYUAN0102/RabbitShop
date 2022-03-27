import request from '@/utils/request'

export const getNewCartGoods = (skuId) => {
    return request(`/goods/stock/${skuId}`, 'get')
}

export const getGoodsSku = (skuId) => {
    return request(`/goods/sku/${skuId}`, 'get')
}

export const mergeCart = (cartList) => {
    return request('member/cart/merge', 'post', cartList)
}

export const findCart = () => {
    return request('member/cart', 'get')
}

export const insertCart = ({ skuId, count }) => {
    return request('/member/cart', 'post', { skuId, count })
}