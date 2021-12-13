import { createStore } from 'vuex'
import food from './food.js'
import user from './user.js'
import comment from './comment.js'
import createdPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    food,
    user,
    comment
  },
  plugins: [
    createdPersistedState({
      paths: ['user']
    })
  ]
})
