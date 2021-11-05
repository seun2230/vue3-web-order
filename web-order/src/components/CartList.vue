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
        <div class="btn-primary">
        </div>
      </div>
    </div>
    <button
      class="submit-btn"
      @click="submitCart(this.carts)">
      결제
    </button>
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
    computed: {
      ...mapState('food', [
        'carts'
      ])
    },
    methods: {
      submitCart(carts) {
        axios.post("http://localhost:3000/foods/post", 
          JSON.stringify(carts),
          {
            headers: {
              "Content-Type": "application/json"
            }
          })
        .then((res) => {
          console.log("submit res.data :", res.data)
        })
        .catch(err => {
          console.error(err);
        })

      }
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