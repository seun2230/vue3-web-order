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
      axios.get('http://localhost:3000/api/user/get/commentMy')
      .then((res) => {
        console.log("data 확인", res.data);
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