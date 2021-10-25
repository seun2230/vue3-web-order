<template>
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
  <button @click="removeCart()">
    -
  </button>
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
      removeCart() {
        this.$store.dispatch('food/removeCart', {
          food: this.food
          })
      }
  }

}
</script>

<style lang="scss" scoped>
.infos {
  display: flex;
}

</style>