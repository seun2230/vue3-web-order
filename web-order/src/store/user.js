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
  mounted() {
    this.state.token = VueCookies.get('auth')
  },
  getters: {

  },
  mutations: {
    user_orders(state, payload) {
      state.user_orders = []
      state.user_orders = payload
    },
    loginToken(state, payload) {
      console.log("mutation_loginToken_payload_user_info", payload.rows[0])
      state.token = payload.token
    },
    logoutToken(state) {
      VueCookies.remove('Auth')
      state.user_infos = []
      state.token = []
      state.user_orders = []
      location.reload;
    },
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
        commit('loginToken', res.data)
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
