<template>
  <div class="infos">
    <div class="name">
      {{ cart.food_name }}
    </div>
    <div class="quantity">
      수량 {{ cart.quantity }}
    </div>
    <div class="total-price">
      금액 {{ cart.food_price * cart.quantity }}
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
        return {
        }
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
@import '../scss/main.scss';

.infos {
  font-size: 20px;
  border: 1px solid #cecdcd;
}
.infos:not(.remove-btn) {
  display: flex;
  background-color: $white;
  border-radius: 5px;
}
</style>