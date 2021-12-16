import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      comments: [],
    }
  },
  getters: {

  },
  mutations: {
    getState(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/comment`)
      .then((res) => {
        state.comments = res.data;
      })
      .catch((err) => {
        console.error("data 실패", err);
      })
    }
  },
  actions: {
  }
}