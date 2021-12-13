import { createStore } from 'vuex'
import food from './food.js'
import user from './user.js'
import admin from './admin.js'
import createdPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    food,
    user,
    admin
  },
  plugins: [
    createdPersistedState({
      paths: ['user']
    })
  ]
})
