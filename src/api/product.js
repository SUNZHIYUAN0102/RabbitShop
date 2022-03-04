import request from "@/utils/request";

export const findGoods = (id) => {
    return request('/goods', 'get', { id })
}

export const findRelevantGoods = (id) => {
    return request('/goods/relevant', 'get', { id, limit: 16 })
}

export const findGoodsHot = (id, type) => {
    return request('/goods/hot', 'get', { id, limit: 3, type })
}

export const findGoodsCommentInfo = (id) => {
    //return request(`/goods/${id}/evaluate`, 'get')
    return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}