import axios from "axios";

export default {
    namespaced: true,
    state: () => {
      return {
        carts: [],
        foods: []
      }  
    },
    getters: {
      totalPrice(state) {
        let total = 0;
        state.carts.forEach(item => {
          total += item.price * item.count;
        })
        return total;
      }
    },
    mutations: {
      resetCart(state) {
        state.carts = []
      },
      success(state, payload) {
				state.foods = payload
			},
      fail() {
        console.log("error")
      },
      async addToCart(state, food) {
        
        let date = new Date();
        let addCart = state.carts.find(item => { 
          return item.id === food.id; 
        });
        
        if (addCart) { 
          addCart.count ++;
          return;
        }

        let num = await axios.get("http://localhost:3000/order_list")
          .then((res) => {
            return res.data[res.data.length-1].order_num
          }).catch(() => {
            console.log("order_list table 안에 order_num에는 어떠한 값도 없습니다.")
            return 0
          })        

        let copiedFood = Object.assign({ 
          user_id : 1,
          order_num: num + 1,
          order_time: date.toDateString()
        }, food)

        state.carts.push(copiedFood)

      },
      removeToCart(state, food) {
        let removeCartFind = state.carts.find(item => {
          return item.id === food.id
        })

        if (removeCartFind.count === 1) {
          const filteredCarts = state.carts.filter(item => item.id !== food.id);
          state.carts = filteredCarts
        } else {
          removeCartFind.count --
          return;
        }
      },
      realRemoveCart(state, food) {
        const filteredCarts = state.carts.filter(item => item.id !== food.id);
        state.carts = filteredCarts
      }
    },
    actions: {
      getState({ commit, state }) {
        axios.get('http://localhost:3000/foods')
        .then((res) => {
          commit('food/success', res.data, { root: true });
          state.carts = []
        })
        .catch((res) => {
          commit('food/fail', res, { root: true })
        })
      },
      addCart({ commit }, food) {
        commit('food/addToCart', food, { root: true });
      },
      removeCart({ commit }, food) {
        commit('food/removeToCart', food, { root: true });
      },
      realRemoveCart({ commit }, food) {
        commit('food/realRemoveCart', food, { root: true });
      }
    }
}