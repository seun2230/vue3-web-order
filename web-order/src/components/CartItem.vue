<template>
  <div class="infos">
    <div class="name">
      {{ cart.name }}
    </div>
    <div class="quantity">
      수량 {{ cart.count }}
    </div>
    <div class="total-price">
      금액 {{ cart.price * cart.count }}
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
@import '../scss/main.scss';

.infos:not(.remove-btn) {
  display: flex;
  background-color: $white;
  border-radius: 5px;
}
</style>