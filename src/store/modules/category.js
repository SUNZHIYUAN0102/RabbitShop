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
        },
        show(state, id) {
            const currCategory = state.list.find(item => item.id === id);
            currCategory.open = true;
        },
        hide(state, id) {
            const currCategory = state.list.find(item => item.id === id);
            currCategory.open = false;
        }
    },
    actions: {
        async getList({ commit }) {
            const { result } = await findAllCategory();
            result.forEach(top => {
                top.open = false;
            })
            commit('setList', result);
        }
    }
}