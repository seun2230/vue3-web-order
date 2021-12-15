import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      slide: [],
      comments: [],
    }
  },
  getters: {

  },
  mutations: {
    getSlide(state) {
      axios.get('http://localhost:3000/api/admin/get/slides')
      .then(res => {
        console.log(res.data)
        state.slide = res.data
      })
      .catch(err => {
        console.log("Error", err)
      })
    },
    getComments(state) {
      axios.get('http://localhost:3000/api/admin/get/comments')
      .then(res => {
        console.log(res.data)
        state.comments = res.data
      })
      .catch(err => {
        console.log("Error", err)
      })
    },
  },
  actions: {

  }
}