export default {
    namespaced: true,
    state() {
        return {
            list: []
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