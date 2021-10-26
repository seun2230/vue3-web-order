<template>
  <div>
    <div class="infos">
      <div class="name">
        {{ cart.food.name }}
      </div>
      <div class="quantity">
        수량 {{ cart.quantity }}
      </div>
      <div class="total-price">
        금액 {{ cart.food.price * cart.quantity }}
      </div>
    </div>
    <button
      class="remove-btn"
      @click="removeCart(this.cart.food)">
      -
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
      this.$store.dispatch('food/removeCart', {
        food,
        quantity: 1
      })
    }
  }
}
</script> 

<style lang="scss" scoped>
@import '../scss/main.scss';

  .infos:not(.remove-btn) {
    display: flex;
    background-color: $white;
    border-radius: 5px;
  }
</style> 