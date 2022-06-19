import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      comments: [],
      myComment: [],
      mycomments: [],
      comment_best: [],
      replys: []
    }
  },
  getters: {
    
  },
  mutations: {
    getState(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/comment/get/comment`)
      .then((res) => {
        state.comments = res.data;
      })
      .catch((err) => {
        console.error("data 실패", err);
      })
    },
    getComment(state, payload) {
      console.log("comment payload", payload);
      axios.get(`${process.env.VUE_APP_URL}/api/comment/get/comment/` + payload)
      .then(res => {
        console.log("getComment success", res.data)
        state.myComment = res.data[0];
      })
      .catch (err => {
        console.log("getComment error", err);
      })
    },
    getReply(state, payload) {
      console.log("reply payload", payload);
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/reply/` + payload)
      .then(res => {
        console.log("reply", res.data)
        state.replys = res.data
      })
      .catch (err => {
        console.log("getReply error", err);
      })
    },
    myArticle(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/myarticle`)
      .then(res => {
        state.mycomments = res.data;
        console.log('res array on mutation', state.mycomments);
      })
      .catch (err => {
        console.log("error: ", err);
      })
    },
    bestComments(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/comment/get/bestComment`)
      .then(res => {
        state.comment_best = res.data;
        console.log(res.data);
       
      })
      .catch(err => {
        console.log("error:", err);
      })
    },
    
  },
  actions: {
  }
}