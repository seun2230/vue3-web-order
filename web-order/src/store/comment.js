import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      comments: [],
      mycomments: [],
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
    },
    myArticle(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/myarticle`)
        .then(res => {
            state.mycomments = res.data;
            console.log('res array on mutation', state.mycomments);
        })
        .catch (err => {
            console.log('err: ', err);
        })
    }
  },
  actions: {
  }
}