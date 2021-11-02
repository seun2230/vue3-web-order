<template>
  <div class="infos">
    <form>
      <div>
        <input id="name" type="text">
        
      </div>
       <div>
        <label for="quantity">{{  cart.count }}</label>
        <input id="quantity" type="text">
      </div>
       <div>
        <label for="total-price">{{ cart.price * cart.count }}</label>
        <input id="total-price" type="text">
      </div>
      <button  class="remove-btn"
      @click="removeCart(this.cart)"> - </button>

    <!--div class="name">
      {{ cart.name }}
    </~div>
    <div class="quantity">
      수량 {{ cart.count }}
    </div>
    <div class="total-price">
      금액 {{ cart.price * cart.count }}
    </div>
    <button--
      class="remove-btn"
      @click="removeCart(this.cart)">
      -
    </button-->
    </form>
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