import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      token: [],
      orderList: [],
    }
  },
  getters: {

  },
  mutations: {
    getOrderList() {
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/orderList`)
      .then(res => {
        console.log(res.data);
        this.state.orderList = res.data;
      }).catch(err => {
        console.log("Error", err);
      })
    },
    loginToken(state, payload) {
      console.log("mutation_loginToken_payload_user_info", payload)
      state.token = payload.token
    },
    logoutToken(state) {
      state.token = []
      state.orderList = []
      location.reload;
    },
  },
  actions: {
    login({ commit }, state) {
      console.log("action_login_state", state)
      axios.post(`${process.env.VUE_APP_URL}/api/auth/login`,
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
  }
}