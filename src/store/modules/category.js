import { topCategory } from '@/api/constant'
import { findAllCategory } from '@/api/category'

export default {
    namespaced: true,
    state() {
        return {
            list: topCategory.map(item => ({ name: item }))
        }
    },
    mutations: {
        setList(state, payload) {
            state.list = payload
        }
    },
    actions: {
        async getList({ commit }) {
            const { result } = await findAllCategory();
            commit('setList', result);
        }
    }
}