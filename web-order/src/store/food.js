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
      async addToCart(state, food) {
        
        let addCart = state.carts.find(item => { 
          return item.food_id === food.food_id; 
        });
        
        if (addCart) { 
          addCart.quantity ++;
          return;
        }

        let copiedFood = Object.assign({
          quantity : 1,
          user_id : 1,
        }, food)

        state.carts.push(copiedFood)
        state.order.push(copiedFood)

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
      async getState({ commit, state }) {
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