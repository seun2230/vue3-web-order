import axios from "axios";

export default {
    namespaced: true,
    state: () => {
      return {
        carts: [],
        foods: [],
        eachFood: [],
        order: [],
        category: [],
      }  
    },
    getters: {
      getCategoryName(state) {
        const totalCategory = state.foods.map(food => food.food_category);
        console.log("getCategoryName category", totalCategory);
        const result = totalCategory.filter((item, index, updateCategory) => updateCategory.indexOf(item) == index);
        console.log("getCategoryName result", result);
        return result;
      }
    },
    mutations: {
      getState(state) {
        axios.get(`${process.env.VUE_APP_URL}/api/food/get/foods/`)
        .then((res) => {
          console.log(res.data)
          state.foods = res.data
        })
        .catch((res) => {
          console.log(res)
        })
      },
      getEachFood(state, payload) {
        console.log("payload", payload);
        axios.get(`${process.env.VUE_APP_URL}/api/food/get/EachFood/` + payload)
        .then((res) => {
          console.log("getEachFood response success", res.data);
          state.eachFood = res.data;
        })
        .catch((err) => {
          console.log("getEachFood response fail", err.response);
        })
      },
      getOrder(state) {
        axios.get(`${process.env.VUE_APP_URL}/api/admin/orderList`)
        .then((res) => {
          state.order = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      },         
      orderList(state) {
        axios.get(`${process.env.VUE_APP_URL}/api/admin/order`)
        .then((res) => {
         state.order = res.data 
         console.log("getOrderList response success",res.data);
        })
        .catch((err) => {
          console.log("getOrderList response fail", err.response);
        })
      },

      fail() {
        console.log("error")
      },
      addToCart(state, food) {
        let addCart = state.carts.find(item => { 
          return item.food_id === food.food_id; 
        });
        
        if (addCart) { 
          addCart.quantity ++;
          return;
        }

        let copiedFood = Object.assign({
          quantity : 1,
        }, food)

        state.carts.push(copiedFood)
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

      totalPrice(state) {
        let total = 0;
        state.carts.forEach(item => {
          total += item.food_price * item.quantity;
        })
        return total;
      },
      getCategory(state, menuItem) {
        console.log("menuItem", menuItem);
        const CategoryItem = state.foods.filter(food => food.food_category === menuItem);
        state.category = CategoryItem;
        console.log("state.category", state.category);
      } 
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