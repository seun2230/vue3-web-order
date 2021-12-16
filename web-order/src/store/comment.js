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
      console.log(state);
      axios.get('http://localhost:3000/api/user/get/comment')
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