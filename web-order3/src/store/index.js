import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

// import food from './food.js'
import user from './user.js'

export default createStore({
    modules: {
        // food,
        user,
    },
    plugins: [
        createPersistedState({
            paths: ['user'],
        }),
    ]
});
