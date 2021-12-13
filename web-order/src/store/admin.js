import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      slide: [],
    }
  },
  getters: {

  },
  mutations: {
    getSlide(state) {
      axios.get('http://localhost:3000/admin/get/slide')
      .then(res => {
        console.log(res.data)
        state.slide = res.data
      })
      .catch(err => {
        console.log("Error", err)
      })
    }
  },
  actions: {

  }
}