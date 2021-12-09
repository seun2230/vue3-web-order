<template>
  <div class="infos">
    <div class="name">
      <span>{{ cart.food_name }}</span>
    </div>
    <div class="quantity">
      <span>{{ cart.quantity }}</span>
    </div>
    <div class="total-price">
      <span>{{ cart.food_price * cart.quantity }}</span>
    </div>
    <button
      class="remove-btn"
      @click="removeCart(this.cart)">
      -
    </button>
    <button
      class="remove-btn"
      @click="realRemoveCart(this.cart)">
      X
    </button>
    <button
      class="remove-btn"
      @click="addCart(this.cart)">
      +
    </button>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
      removeCart(food) {
        this.$store.dispatch('food/removeCart', food)
      },
      realRemoveCart(food) {
        this.$store.dispatch('food/realRemoveCart', food)
      },
      addCart(food) {
        this.$store.dispatch('food/addCart', food)
      }
  }

}
</script>

<style lang="scss" scoped>

</style>