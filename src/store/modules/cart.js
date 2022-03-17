export default {
    namespaced: true,
    state() {
        return {
            list: []
        }
    },
    getters: {
        validList(state) {
            return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
        },

        validTotal(state, getters) {
            return getters.validList.reduce((p, c) => p + c.count, 0)
        },

        validAmount(state, getters) {
            return getters.validList.reduce((p, c) => p + c.count * c.nowPrice * 100, 0) / 100
        }
    },
    mutations: {
        insertCart(state, payload) {
            const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
            if (sameIndex > -1) {
                const count = state.list[sameIndex].count
                payload.count += count
                state.list.splice(sameIndex, 1);
            }
            state.list.unshift(payload);
        }
    },
    actions: {
        insertCart(ctx, payload) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {

                } else {
                    ctx.commit('insertCart', payload)
                    resolve()
                }
            })

        }
    }
}