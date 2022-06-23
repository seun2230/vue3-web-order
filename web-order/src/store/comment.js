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
    addReply(state, payload) {
      // state.replys = [...state.replys, payload] 
      let index = state.replys.find(x => x.users_user_id === payload.userId);

      if(index) {
        state.replys.push({ 
          reply_text: payload.text,
          reply_date: payload.date,
          users_user_id: payload.userId,
        });
        console.log("state.replys", state.replys);    
      }
    },
    fixReply(state, payload) {
      console.log("payload.reply_id", payload.reply_id);
      console.log("state reply_date", payload.date);
      let index = state.replys.find(x => x.id_reply === payload.reply_id);     
      
      if(index) {
        state.replys.push({
          reply_text: payload.text,
          reply_date : payload.date,
          users_user_id: payload.userId,
          id_reply: payload.replyId,
        })
        console.log("data insert", state.replys);   
        return state.replys; 
      } else {
        return false;
      }
    },
    deletedReply(state, payload) {
      console.log("deleteReply payload", payload);
    
      let index = state.replys.find(x => x.users_user_id === payload.userId)

      if(index) {
        state.replys.splice({index, 1: 1});
        return state.replys;
      } else {
        return false; 
      }      
    },
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
    writeReply({ commit }, payload) {
      const id = payload[0].comment_id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/write/reply/` + id,
      JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((res) => {
        console.log("data success!", res.data);
        commit('addReply', res.data);
      })
      .catch(err => {
        console.log("data fail", err.response);
      })
    },
    modifyReply({commit}, payload) {
      console.log("response payload", payload);
      const id = payload[0].comment_id;
      console.log("payload id check", id);
      axios.post(`${process.env.VUE_APP_URL}/api/user/modify/reply/` + id,
      JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((res) => {
        console.log("data response success", res.data);
        commit('fixReply', res.data);
      })
      .catch(err => {
        console.log("data response fail", err.respons);
      })
    },
    deleteReply({commit}, payload) {
      console.log("payload deleteReply", payload);
      const id = payload[0].comment_id;
      console.log("payload data commet_id", id);
      axios.post(`${process.env.VUE_APP_URL}/api/user/delete/reply/` + id,
      JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        console.log("deleteReply response success", res.data);
        commit('deletedReply', res.data);
      }).catch(err => {
        console.log("deleteReply response fail", err.response);
      })
    }
  }
}