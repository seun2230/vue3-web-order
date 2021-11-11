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
      // payload: 상태값 변이 시킬 때 사용함.
      success(state, payload) {
				console.log(state)
				console.log("payload", payload)
				state.foods = payload
			},
			fail() {
				console.log("error")
			},
      
      // 이미지 버튼 클릭시 수량 추가하는 경우
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

      // 수량 추가 버튼 
      increaseToCount(state,food) {
        let addItem = state.carts.find(item => item.id == food.id);
        addItem.count++;
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

      removeAllCart(state, food) {
        // const cartItem = state.cart.find(item => item.id === food.id)
        const removeCart = state.carts.filter(item => item.id !== food.id);
        state.carts = removeCart
        // console.log(state.carts);
        // 조금 더 고민해보기
      state.carts = [];
        console.log(state.carts);
      },
    
      // 전체삭제 튼 눌렀을 시 cart 안 내용이 비워져야 함. -> 초기화값이 필요함
    },

    actions: {
      getState({ commit }) {
        console.log("action!")
        axios.get('http://localhost:3000/menu')
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
      increaseCount({ commit }, food) {
        commit('food/increaseToCount', food, { root: true});
      },
      removeCart({ commit }, food) {
        commit('food/removeToCart', food, { root: true });
      },
      removeAllCart({ commit }, food) {
        commit('food/removeAllCart', food, { root: true});
      }
    }
}