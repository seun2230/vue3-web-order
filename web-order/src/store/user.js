import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  namespaced: true,
  state: () => {
    return {
      token: [],
      user_orders: []
    }
  },
  getters: {

  },
  mutations: {
    user_orders(state, payload) {
      state.user_orders = []
      state.user_orders = payload
    },
    loginToken(state, payload) {
      console.log("mutation_loginToken_payload_user_info", payload)
      state.token = payload.token
    },
    logoutToken(state) {
      VueCookies.remove('Auth')
      state.user_infos = []
      state.token = []
      state.user_orders = []
      location.reload;
    },
<<<<<<< HEAD
    cookie(state) {
      state.token = VueCookies.get('auth')
    }
=======
>>>>>>> f5320509fb97551ad31c9b2c1d3937c52eb56595
  },
  actions: {
    login({ commit }, state) {
      console.log("action_login_state", state)
      axios.post('http://localhost:3000/auth/login', 
      JSON.stringify(state), 
      {
        headers: {
          'Content-Type' : "application/json"
        }
      }).then(async(res) => {
        commit('cookie')
        console.log("server res : ", res);
      }).catch(err => {
        console.log("err", err)
      })
    },
    logout({ commit }) {
      commit('logoutToken')
    },
    user_orders({ commit }, state) {
      console.log(state)
      axios.post('http://localhost:3000/myorder', 
      JSON.stringify(state),
      { 
        headers: {
          "Content-Type" : "application/json" 
        }
      })
      .then(res => {
        console.log("res server : ",res)
        commit('user_orders', res.data)
      }).catch(err => {
        console.log("error", err)
      })
    },
  }
}
