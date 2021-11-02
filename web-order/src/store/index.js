import { createStore } from 'vuex'
import food from './food.js'
// import user from './user.js'

export default createStore({
    modules: {
        food,
        // user
    }
})