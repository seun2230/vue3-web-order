import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      comments: [],
      myComment: [],
      mycomments: [],
      comment_best: [],
    }
  },
  getters: {
  },
  mutations: {
    getState(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/comment/get/comment`)
      .then((res) => {
        console.log("getState response success")
        state.comments = res.data;
      })
      .catch((err) => {
        console.error("getState response fail", err.response);
      })
    },
    getComment(state, payload) {
      console.log("comment payload", payload);
      axios.get(`${process.env.VUE_APP_URL}/api/comment/get/comment/` + payload.page + '/' +  payload.id)
      .then(res => {
        console.log("getComment response success", res.data);
        state.myComment = res.data[0];
      })
      .catch (err => {
        console.log("getComment response fail", err.response);
      })
    },
    myArticle(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/myarticle`)
      .then(res => {
        state.mycomments = res.data;
        console.log("myArticle response success", state.mycomments);
      })
      .catch (err => {
        console.log("myArticle response fail", err.response);
      })
    },
    bestComments(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/comment/get/bestComment`)
      .then(res => {
        state.comment_best = res.data;
        console.log("bestComments response success", res.data);
      })
      .catch(err => {
        console.log("bestComments response success", err.response);
      })
    },
    
  },
  actions: {
  }
}