import axios from 'axios'
import VueCookies from 'vue-cookies'
export default {
  namespaced: true,
  state: () => {
    return {
      user_infos: [],
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
      console.log("mutation_loginToken_payload_user_info", payload.rows[0])
      VueCookies.set("Auth", payload.token)
      state.user_infos = payload.rows[0]
      state.token = payload.token
    },
    logoutToken(state) {
      VueCookies.remove('Auth')
      state.user_infos = []
      state.token = []
      state.user_orders = []
      location.reload;
    }
  },
  actions: {
    login({ commit }, state) {
      console.log("action_login_state", state)
        axios.post('http://localhost:3000/login', state,
        {
          headers: {
            'Content-Type' : "application/json"
          }
        }).then(async(res) => {
          await commit('loginToken', res.data)
          console.log(res);
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
          state,
          {
            headers: {
              "Content-Type" : "application/json"
            }
          })
        .then(res => {
          commit('user_orders', res.data)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }