import axios from 'axios'
import router from '../views/router';

export default {
  namespaced: true,
  state: () => {
    return {
      token: [],
      orderList: [],
      user_info: [],
    }
  },
  getters: {
    isAuth: function(state) {
      console.log('isAuth state', state.token);
      if (state.token.length < 1) {
        return false;
      } else {
        return true;
      }
    },
    getUserName: function(state) {
      if (state.user_info.length > 0) {
        return state.user_info[0].user_name;
      } else {
        return null;
      }
    }
  },
  mutations: {
    getOrderList() {
      axios.get('http://localhost:3000/api/user/get/orderList')
      .then(res => {
        console.log(res.data);
        this.state.orderList = res.data;
      }).catch(err => {
        console.log("Error", err);
      })
    },
    login(state, payload) {
      console.log("mutation_loginToken_payload_user_info", payload)
      state.user_info = [{
        "user_id" : payload.data.user_id,
        "user_name":payload.data.user_name }]
      state.token = payload.data.token
    },
    logout(state) {
      console.log("adf", process.env.VUE_APP_URL)
      state.token = [],
      state.orderList = [],
      state.user_info = [],
      location.reload;
      router.push('/');
      axios.post(`http://localhost:3000/api/auth/logout`)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err)
      })
    },
  },
  actions: {
    login({ commit }, state) {
      console.log("action_login_state", state)
      axios.post('http://localhost:3000/api/auth/login',
      JSON.stringify(state),
      {
        headers: {
          'Content-Type' : "application/json"
        }
      }).then((res) => {
        commit('login', res)
        console.log("server res : ", res);
        if (res.status == 200) {
          router.push('/');
        }
      }).catch(err => {
        console.log("err", err)
      })
    },
  }
}
