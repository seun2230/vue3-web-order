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
      getState(state) {
        axios.get('http://localhost:3000/api/food/get/foods')
        .then((res) => {
          console.log(res.data)
          state.foods = res.data
        })
        .catch((res) => {
          console.log(res)
        })
      },
      getOrder(state) {
        axios.get('http://localhost:3000/api/admin/orderlist')
        .then((res) => {
          state.order = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      },
      resetCart(state) {
        state.carts = []
      },
      success(state, payload) {
				state.foods = payload
			},

      checkOrder(state, payload) {
        state.order = payload
      },
            
      orderList(state) {
        axios.get('http://localhost:3000/api/admin/order')
        .then((res) => {
         state.order = res.data 
         console.log("jjj",res.data);
        })
        .catch((err) => {
          console.log(err);
        })
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

        let copiedFood = Object.assign({
          quantity : 1,
          user_id : 1,
        }, food)

        state.carts.push(copiedFood)
       //  state.order.push(copiedFood)
      },
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
      },
    },

    actions: {
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