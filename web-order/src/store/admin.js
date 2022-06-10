import axios from 'axios'

export default {
  namespaced: true,
  state: () => {
    return {
      slide: [],
      comments: [],
      users: [],
      orderList: [],
      orderListComplete: [],
      nullImages: []
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
    },
    getOrderList(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/admin/get/orderList`)
      .then(res => {
        console.log(res.data)
        state.orderList = res.data
      })
    },
    getOrderListComplete(state) {
      axios.get(`${process.env.VUE_APP_URL}/api/admin/get/orderListComplete`)
      .then(res => {
        console.log(res.data)
        state.orderListComplete = res.data
      })
    },
    getNullImage(state, payload) {
      axios.get(`${process.env.VUE_APP_URL}/api/admin/get/nullImage`, payload)
      .then(res => {
        console.log("null Image suceess", res.data);
        state.nullImages = res.data[0].null_image;
      })
    }

  },
  actions: {

  }
}