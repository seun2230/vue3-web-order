<template>
  <div class="container">
    <div class="inner">
      <div
        class="carts">
        <CartItem
          v-for="cart in carts"
          :key="cart.food.name"
          :cart="cart" />
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue'
import { mapState } from 'vuex'
// import { mapGetters } from 'vuex'

export default {
    components: {
        CartItem
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