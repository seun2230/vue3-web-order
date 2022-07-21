import axios from 'axios'
import router from '../routes/index.js';

export default {
  namespaced: true,
  state: () => {
    return {
      token: [],
      orderList: [],
      user_info: [],
      likeUser: [],
    }
  },
  getters: {
    likeBtn(state) {
      const likeInfo = state.likeUser.find(x => x.user_id === state.user_info[0].user_id);
      if(likeInfo == null) {
        return false;
      } else {
        return true;
      }
    },
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
    getLikeUserList(state, payload) {
      console.log("payload", payload)
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/likeStatus/` + payload)
      .then(res => {
        console.log("server", res);
        state.likeUser = res.data;
      })
      .catch(err => {
        console.log("err", err)
      })
    },
    getOrderList(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/orderList`)
      .then(res => {
        console.log("sss", res.data)
        state.orderList = res.data;
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
      state.token = [],
      state.orderList = [],
      state.user_info = [],
      location.reload;
      router.push('/');
      axios.post(`${process.env.VUE_APP_URL}/api/auth/logout`)
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
      axios.post(`${process.env.VUE_APP_URL}/api/auth/login`,
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
    like({commit}) {
      commit('setLikeUserList')
    },
    dislike({commit}) {
      commit('deleteLikeUserList')
    }
  }
}