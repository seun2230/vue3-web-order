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
                total += item.food.price * item.food.count;               
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
      addToCart(state, { food }) {
        let addCart = state.carts.find(item => { 
          return item.food.id === food.id; 
        });
        
        if (addCart) { 
          addCart.food.count ++;
          return;
        }
        
        state.carts.push({ food })

      },
      removeToCart(state, { food }) {
        let removeCartFind = state.carts.find(item => {
          return item.food.id === food.id
          })

        if (removeCartFind.food.count === 1) {
          const filteredCarts = state.carts.filter(item => item.food.id !== food.id);
          state.carts = filteredCarts
        } else {
          removeCartFind.food.count -= food.count
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
      addCart({ commit }, { food }) {
        commit('food/addToCart', { food }, { root: true });
      },
      removeCart({ commit }, { food } ) {
        commit('food/removeToCart', { food }, { root: true });
      }
    }
}