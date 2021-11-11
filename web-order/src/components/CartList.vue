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
        <div class="btn-group">
          <button type="button" @click="removeAllCart(this.carts)">전체 주문 취소</button>
          <button type="button" @click="sendPayment(this.carts)">최종 결제</button>
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
      removeAllCart(food) {
       this.$store.dispatch('food/removeAllCart', food)
      },

      sendPayment(carts) {
        console.log('결제 내역 mysql 전달');
        // console.log(JSON.stringify(carts));
        const url = 'http://localhost:3000/menu/pay';
        axios.post(url, JSON.stringify(carts),
        {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((res)  => {
          // alert('결제하시겠습니까?')
          console.log("res.data", res.data);         
        })
        .catch((err) => {
          console.log(err);
          alert('결제 시 문제가 생겼습니다.');
        });
      }, 
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

      .btn-group {
        padding: 10px;
      }
    }
  }
    
}
</style>