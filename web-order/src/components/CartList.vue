<template>
  <div class="container show-grid">
    <div class="inner">
      <div class="row">
        <div class="col-md-8">
          <div class="carts">
            <CartItem
              v-for="cart in carts"
              :key="cart.food.name"
              :cart="cart" />
          </div>
        </div>
        <div class="col-md-4">
          <TotalPrice />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue'
import TotalPrice from './TotalPrice.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CartItem,
    TotalPrice
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
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
  }
  .carts {
    // display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style> 