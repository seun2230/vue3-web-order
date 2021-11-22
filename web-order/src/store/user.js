import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {

  namespaced: true,
  state: () => {
    return {
      user_info: [],
      token: []
    }
  },
  getters: {
    stateInfo(state) {
      if (!state.token === VueCookies.get("Auth")) { state.user_info = [] }
    }
  },
  mutations: {
    loginToken(state, payload) {
      console.log("mutation_loginToken_payload_user_info", payload.rows[0])
      VueCookies.set("Auth", payload.token)
      state.user_info = payload.rows[0]
      state.token = payload.token
    },
    logoutToken(state) {
      VueCookies.remove('Auth')
      state.user_info = []
      state.token = []
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
        }).then(res => {
          commit('loginToken', res.data)
          console.log(res);
        }).catch(err => {
          console.log("err", err)
        })
      },
      logout({ commit }) {
        commit('logoutToken')
      }
    }
  }
