import request from '@/utils/request'

export const getNewCartGoods = (skuId) => {
    return request(`/goods/stock/${skuId}`, 'get')
}

export const getGoodsSku = (skuId) => {
    return request(`/goods/sku/${skuId}`, 'get')
}