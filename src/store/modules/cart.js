import { getNewCartGoods } from "@/api/cart"

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
        },

        updateCart(state, goods) {
            const updateGood = state.list.find(item => item.skuId === goods.skuId)
            for (const key in goods) {
                if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
                    updateGood[key] = goods[key]
                }
            }
        },

        deleteCart(state, skuId) {
            const index = state.list.findIndex(item => item.skuId === skuId)
            state.list.splice(index, 1)
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
        },

        findCart(ctx) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {

                } else {
                    const promiseArr = ctx.state.list.map(goods => {
                        return getNewCartGoods(goods.skuId)
                    })
                    Promise.all(promiseArr).then(dataList => {
                        dataList.forEach((data, i) => {
                            ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
                        })
                        resolve()
                    })
                }
            })
        },

        deleteCart(ctx, payload) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {

                } else {
                    ctx.commit('deleteCart', payload)
                    resolve()
                }
            })
        }
    }
}