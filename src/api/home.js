import request from "@/utils/request";

export const findBrand = () => {
    return request('/home/brand', 'get', { limit: 6 })
}