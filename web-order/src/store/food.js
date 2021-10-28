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
      success(state, payload) {
				console.log(state)
				console.log("payload", payload)
				state.foods = payload
			},
			fail() {
				console.log("error")
			},
      addToCart(state, food) {
        let addCart = state.carts.find(item => { 
          return item.id === food.id; 
        });
        
        if (addCart) { 
          addCart.count ++;
          return;
        }
      
        let copiedFood = Object.assign({}, food)

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
      }
    },
    actions: {
      getState({ commit }) {
        console.log("action!")
        axios.get('http://localhost/foods')
        .then((res) => {
          console.log(res)
          commit('food/success', res.data, { root: true });
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
      }
    }
}