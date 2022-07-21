<template>
  <div class="container">
    <div class="section-carts">
      <div class="cart-box">
        <span class="name">{{ cart.food_name }}</span>
        {{ cart.food_price * cart.quantity }} 원
      </div>
    </div>
    <div class="section-button">
      <div 
        class="btn-remove"
        @click="realRemoveCart(this.cart)">
        x
      </div>
      <div class="btn-count">
        <div 
          class="btn--white btn--sm"
          @click="removeCart(this.cart)">
          -
        </div>
        <div
          class="btn-quantity">
          {{ cart.quantity }}
        </div>
        <div 
          class="btn--white btn--sm"
          @click="addCart(this.cart)">
          +
        </div>
      </div>
    </div>
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
@import '@/scss/variables.scss';
.container {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  display: flex;
  border-bottom: 1px solid $gray-500;
  .section-carts {
    width: 100%;
    padding: 10px;
    display: grid;
    align-items: center;
    font-weight: 800;
    color: $menuBg;
    .cart-box {
      width: 100%;
      height: 25px;

      .name {
        font-size: 1.4rem;
        font-weight: bolder;
        line-height: 40px;
      }
    }
  }
}

.section-button {
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: 500;
  .btn-remove {
    margin-right: 5px;
    text-align: right;
    font-size: 1.2rem;
    font-weight: bolder;
    color: $gray-700;
  }
  .btn-count {
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;

    .btn-quantity {
      width: 40px;
      height: 30px;
      border: 1px solid $gray-500;
      border-radius: .2rem;
      box-shadow: 2px 2px 5px #0000001a;
      color: $gray-700;
      font-size: 1.2em;
      line-height: 30px;
    }
    .btn--white.btn--sm {
      width: 40px;
      height: 30px;
      border: 1px solid $gray-500;
      border-radius: .2rem;
      color: $gray-700;
      font-size: 1.5rem;
      line-height: 30px;
    }
  }
}
</style>