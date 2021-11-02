<template>
  <div class="container show-grid">
    <div class="inner">
      <div class="row">
        <div class="col-md-8">
          <div
            class="carts">
            <CartItem
              v-for="cart in carts"
              :key="cart.name"
              :cart="cart" />
          </div>
          <div
            class="carts-un"
            메뉴를
            선택해주세요.>
          </div>
        </div>
        <div class="col-md-4">
          <TotalPrice />
        </div>
        <div>
          <button type="button" @click="sendPayment(this.carts)">결제</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue'
import TotalPrice from './TotalPrice.vue'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    components: {
        CartItem,
        TotalPrice
    },

    methods: {
      sendPayment(carts) {
        console.log('결제 내역 mysql 전달');
        const url = 'https://localhost:3000/menu/pay';
        axios.post(url, carts);
        // .then((res) => res.stringify.json())
        // .catch((err) => {
        //  console.log('fail', err);
       // })
      }
      
    },
    computed: {
        ...mapState('food', [
            'carts'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";


.container {
    margin-top: 30px;
    .inner {
        background-color: $gray-200;
        padding: 20px;
        border-radius: 4px;
        text-align: center;
        .carts {
        flex-wrap: wrap;
        justify-content: center;
        background-color: white;
        border-radius: 5px;
    }
  }
    
}
</style>