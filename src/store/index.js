import { createStore } from 'vuex'
import cart from './modules/cart'
import user from './modules/user'
import category from './modules/category'

export default createStore({
    modules: {
        cart,
        user,
        category
    }
})