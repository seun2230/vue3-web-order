import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      replys: []
    }
  },
  getters: {

  },
  mutations: {
    getReply(state, payload) {
      console.log("getReply payload", payload);
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/reply/` + payload.page +  '/' + payload.id)
      .then(res => {
        console.log("getReply response success", res.data);
        state.replys = res.data;
      })
      .catch (err => {
        console.log("getReply response error", err.response);
      })
    },
    getMoreReply(state, payload) {
      console.log("getReply payload", payload);
      console.log("page", payload.page);
      axios.get(`${process.env.VUE_APP_URL}/api/user/get/reply/` + payload.page +  '/' + payload.id)
      .then(res => {
        console.log("getMoreReply response success", res.data);
        state.replys = res.data;
      })
      .catch (err => {
        console.log("getMoreReply response error", err.response);
      })
    },
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
    removeReply(state, payload) {
      console.log("deleteReply payload", payload);
    
      let index = state.replys.find(x => x.users_user_id === payload.userId);
      if(index) {
        console.log("state.replys.splice", state.replys.splice(index, 1));
        return state.replys.splice(index, 1);
      } else {
        return false; 
      }      
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
        console.log("writeReply respons success", res.data);
        commit('addReply', res.data);
      })
      .catch(err => {
        console.log("writeReply respons fail", err.response);
      })
    },
    modifyReply({commit}, payload) {
      console.log("payload modfiyReply", payload);
      const id = payload[0].comment_id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/modify/reply/` + id,
      JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((res) => {
        console.log("modifyReply response success", res.data);
        commit('fixReply', res.data);
      })
      .catch(err => {
        console.log("modifyReply response fail", err.respons);
      })
    },
    deleteReply({commit}, payload) {
      console.log("payload deleteReply", payload);
      const id = payload[0].comment_id;
      axios.post(`${process.env.VUE_APP_URL}/api/user/delete/reply/` + id,
      JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        console.log("deleteReply response success", res.data);
        commit('removeReply', res.data);
      }).catch(err => {
        console.log("deleteReply response fail", err.response);
      })
    }
  }
}