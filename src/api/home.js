import request from "@/utils/request";

export const findBrand = (limit = 6) => {
    request('/home/brand', 'get', { limit })
}