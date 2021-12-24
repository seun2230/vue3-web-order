import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      slide: [],
      comments: [],
      users: []
    }
  },
  getters: {

  },
  mutations: {
    getSlide(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/admin/get/slides`)
      .then(res => {
        console.log(res.data)
        state.slide = res.data
      })
      .catch(err => {
        console.log("Error", err)
      })
    },
    getComments(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/admin/get/comments`)
      .then(res => {
        console.log(res.data)
        state.comments = res.data
      })
      .catch(err => {
        console.log("Error", err)
      })
    },
    getUserList(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/admin/get/userList`)
      .then(res => {
        console.log(res.data)
        state.users = res.data
      })
    }
  },
  actions: {

  }
}