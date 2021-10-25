export default {
    namespaced: true,
    state: () => {
        return {
            cart: [],
            foods: [
                {
                    "name": "FirstFood",
                    "price": 1500,
                    "info": "First",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 1
                },
                {
                    "name": "SecondFood",
                    "price": 1500,
                    "info": "Second",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 2
                },
                {
                    "name": "ThirdFood",
                    "price": 1500,
                    "info": "Third",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 3
                },
                {
                    "name": "FourthFood",
                    "price": 1500,
                    "info": "Fourth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 4
                },
                {
                    "name": "FifthFood",
                    "price": 1500,
                    "info": "Fifth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 5
                },
                {
                    "name": "SixthFood",
                    "price": 1500,
                    "info": "Sixth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 6
                },
                {
                    "name": "SeventhFood",
                    "price": 1500,
                    "info": "Fifth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 7
                },
                {
                    "name": "EighthFood",
                    "price": 1500,
                    "info": "Fifth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 8
                },
                {
                    "name": "NinethFood",
                    "price": 1500,
                    "info": "Fifth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 9
                },
                {
                    "name": "tenthFood",
                    "price": 1500,
                    "info": "Fifth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 10
                },
                {
                    "name": "EleventhFood",
                    "price": 1500,
                    "info": "Fifth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 11
                },
                {
                    "name": "TwelvethFood",
                    "price": 1500,
                    "info": "Fifth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 12
                },
                {
                    "name": "TwelvethFood",
                    "price": 1500,
                    "info": "Fifth",
                    "image": "https://img.huffingtonpost.com/asset/602c66fc240000ae01cbc1e2.jpeg?cache=YXkQIJs6ue&ops=1778_1000",
                    "count": 0,
                    "id": 12
                }
            ] 
        }  
    },
    getters: {},
    mutations: {
        addToCart(state, { food, quantity }) {
            console.log("state : ", state)
            console.log("this.state : ", this.state)
            console.log("food : ", food)
            console.log("this.food : ", this.food)
            console.log("quantity : ", quantity)
            console.log("this.quantity : ", this.quantity)
            state.cart.push(
                { food, quantity }
            )
        },
    },
    actions: {
        addCart({ commit }, { food, quantity }) {
            commit('food/addToCart', { food, quantity }, { root: true });
            console.log("food : ", food, "foodType : ", typeof(food))
            console.log("quantity : ", quantity, "quantityType : ", typeof(quantity))
        }
    }
}