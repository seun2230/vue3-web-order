import axios from 'axios'
import VueCookies from 'vue-cookies'

export default {
  namespaced: true,
  state: () => {
    return {
      token: [],
      user_orders: [],
      isAuth: !!VueCookies.get('Auth')
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
      state.user_infos = payload.rows[0]
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
        axios.post('http://localhost:3000/auth/login', state,
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
      },
      signUp(context, payload) {
        console.log('payload on signUp action', payload)
        return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/auth/register", payload)
        .then((response) => {
          console.log("server res : ", response)
          const { data } = response;
          if (data.success) {
            alert('success');
            resolve(response);
          } else if(data.Error) {
            alert('이미 등록된 아이디');
          }
        })
        .catch(error => {
          reject(error);
          })
        })
      }
    }
  }
