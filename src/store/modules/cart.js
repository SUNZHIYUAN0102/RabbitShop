import { deleteCart, findCart, getNewCartGoods, insertCart, mergeCart, updateCart } from "@/api/cart"

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
        },

        invalidList(state) {
            return state.list.filter(goods => goods.stock <= 0 && !goods.isEffective)
        },

        selectedList(state, getters) {
            return getters.validList.filter(item => item.selected)
        },

        selectedTotal(state, getters) {
            return getters.selectedList.reduce((p, c) => p + c.count, 0)
        },

        selectedAmount(state, getters) {
            return getters.selectedList.reduce((p, c) => p + c.count * Math.round(c.nowPrice * 100), 0) / 100
        },

        isCheckAll(state, getters) {
            return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
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
        },

        setCart(state, payload) {
            state.list = payload
        }
    },
    actions: {
        insertCart(ctx, payload) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    insertCart({ skuId: payload.skuId, count: payload.count }).then(() => {
                        return findCart()
                    }).then(data => {
                        ctx.commit('setCart', data.result)
                        resolve()
                    })
                } else {
                    ctx.commit('insertCart', payload)
                    resolve()
                }
            })
        },

        findCart(ctx) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    findCart().then(data => {
                        ctx.commit('setCart', data.result)
                    })
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
                    deleteCart([payload]).then(() => {
                        return findCart()
                    }).then(data => {
                        ctx.commit('setCart', data.result)
                        resolve()
                    })
                } else {
                    ctx.commit('deleteCart', payload)
                    resolve()
                }
            })
        },

        updateCart(ctx, payload) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    updateCart(payload).then(() => {
                        return findCart()
                    }).then(data => {
                        ctx.commit('setCart', data.result)
                        resolve()
                    })
                } else {
                    ctx.commit('updateCart', payload)
                    resolve()
                }
            })
        },

        checkAllCart(ctx, selected) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {

                } else {
                    ctx.getters.validList.forEach(goods => {
                        ctx.commit('updateCart', { skuId: goods.skuId, selected })
                    })
                    resolve()
                }
            })
        },

        batchDeleteCart(ctx, isClear) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(item => item.skuId)
                    deleteCart(ids).then(() => {
                        return findCart()
                    }).then(data => {
                        ctx.commit('setCart', data.result)
                        resolve()
                    })
                } else {
                    ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
                        ctx.commit('deleteCart', item.skuId)
                    })
                    resolve()
                }
            })
        },

        updateCartSku(ctx, { oldSkuId, newSku }) {
            return new Promise((resolve, reject) => {
                if (ctx.rootState.user.profile.token) {
                    const oldGoods = ctx.state.list.find(x => x.skuId === oldSkuId)
                    deleteCart([oldSkuId]).then(() => {
                        return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
                    }).then(() => {
                        return findCart()
                    }).then((data) => {
                        ctx.commit('setCart', data.result)
                        resolve()
                    })
                } else {
                    const oldGoods = ctx.state.list.find(x => x.skuId === oldSkuId)
                    ctx.commit('deleteCart', oldSkuId)
                    const { skuId, price: nowPrice, specsText: attrsText, inventory: stock } = newSku
                    const newGoods = {...oldGoods, skuId, nowPrice, attrsText, stock }
                    ctx.commit('insertCart', newGoods)
                    resolve()
                }
            })
        },

        async mergeCart(ctx) {
            const cartList = ctx.state.list.map((goods) => {
                return {
                    skuId: goods.skuId,
                    selected: goods.selected,
                    count: goods.count
                }
            })

            await mergeCart(cartList)
            ctx.commit('setCart', [])
        }
    }
}