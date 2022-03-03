import request from "@/utils/request";

export const findGoods = (id) => {
    return request('/goods', 'get', { id })
}

export const findRelevantGoods = (id) => {
    return request('/goods/relevant', 'get', { id, limit: 16 })
}