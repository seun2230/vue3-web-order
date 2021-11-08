<template>
  <div class="infos">
    <div class="name">
      {{ cart.name }}
    </div>
    <div class="total-price">
      금액 {{ cart.price * cart.count }}
    </div>
    <div class="quantity">
      <button 
       class="remove-btn"
       @click="removeCart(this.cart)"> -
      </button>
      {{ cart.count }}
      <button
       @click="increaseCart(this.cart)"> +
      </button>
    </div>
    
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
      increaseCart(food) {
        this.$store.dispatch('food/increaseCart', food)
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