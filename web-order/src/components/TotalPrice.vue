<template>
  <div class="total">
    <h1 class="message">
      총 금액 :
    </h1>
    <div class="price">
      {{ totalPrice }} 원
    </div>  
    <div class="btn-group">
        <button
        class="submit-btn"
        @click="submitCart(this.carts, this.totalPrice)">
        결제
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'

export default {
    computed: {
      ... mapState ('food', ['carts']),
      ... mapGetters('food', ['totalPrice'])
    },
    
    methods: {
      submitCart(carts, totalprice) {
        const list = [carts, totalprice]
         this.$store.commit('food/orderList')
       //  this.$store.state.order.push(list);
        axios.post("http://localhost:3000/foods/post", 
          JSON.stringify(list),
          {
            headers: {
              "Content-Type": "application/json"
            }
          })
        .then((res) => {
          console.log("submit res.data :", res.data)
          // this.$store.commit('food/resetCart')          
        })
        .catch(err => {
          console.error(err);
        })
      }
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.total {
<<<<<<< HEAD
  text-align: center;
=======
    text-align: center;
>>>>>>> f3c45962d8c90edc7666242c9a92f3053b5ad50c
}
</style>