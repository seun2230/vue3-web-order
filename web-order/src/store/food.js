import axios from "axios";

export default {
    namespaced: true,
    state: () => {
      return {
        carts: [],
        foods: [],
        order: []
      }  
    },
    getters: {
      totalPrice(state) {
        let total = 0;
        state.carts.forEach(item => {
          total += item.food_price * item.quantity;
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
      addToCart(state, food) {
        // let date = new Date();
        let addCart = state.carts.find(item => { 
          return item.food_id === food.food_id; 
        });
        
        if (addCart) { 
          addCart.quantity ++;
          return;
        }

        // let num = await axios.get("http://localhost:3000/order_list")
        //   .then((res) => {
        //     if (res.data[0]["max(order_num)"] === null) {
        //       return 0
        //     } else {
        //       return res.data[0]["max(order_num)"]
        //     }
        //   }).catch((err) => {
        //     console.log(err)
        //   })

        let copiedFood = Object.assign({
          quantity : 1,
          user_id : 1,
          // order_num: num + 1,
          // order_time: date.toDateString()
        }, food)

        state.carts.push(copiedFood)
        state.order.push(copiedFood)
      },

      // 수량 추가 버튼 
      increaseToCount(state,food) {
        let addItem = state.carts.find(item => item.id == food.id);
        addItem.count++;
      },

      removeToCart(state, food) {
        let removeCartFind = state.carts.find(item => {
          return item.food_id === food.food_id
        })

        if (removeCartFind.quantity === 1) {
          const filteredCarts = state.carts.filter(item => item.food_id !== food.food_id);
          state.carts = filteredCarts
        } else {
          removeCartFind.quantity --
          return;
        }
      },

      realRemoveCart(state, food) {
        const filteredCarts = state.carts.filter(item => item.food_id !== food.food_id);
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
      increaseCount({ commit }, food) {
        commit('food/increaseToCount', food, { root: true});
      },
      removeCart({ commit }, food) {
        commit('food/removeToCart', food, { root: true });
      },
      realRemoveCart({ commit }, food) {
        commit('food/realRemoveCart', food, { root: true });
      }
    }
}