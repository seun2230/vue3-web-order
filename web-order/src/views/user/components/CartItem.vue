<template>
  <div class="container">
    <div class="infos-container">
      <div class="name-box">
        <span class="name">{{ cart.food_name }}</span>
      </div>
      <div class="quantity-box">
        <span class="quantity">{{ cart.quantity }} 개</span>
      </div>
      <div class="price-box">
        <span class="price">{{ cart.food_price * cart.quantity }} 원</span>
      </div>
    </div>
    <div class="btn-group">
      <div class="btn-menu"
        @click="addCart(this.cart)">
        <i class="fas fa-angle-up"></i>
      </div>
      <div class="btn-menu"
        @click="realRemoveCart(this.cart)">
        <i class="fas fa-ban"></i>
      </div>
      <div class="btn-menu"
        @click="removeCart(this.cart)">
        <i class="fas fa-angle-down"></i>
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
@import '../../../scss/variables.scss';
span {
  width: 100%;
}

.container {
  margin-top: 10px;
  display: flex;
  padding: 10px;
  border-radius: 9px;
  height: 100px;
  width: 100%;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  .infos-container {
    display: grid;
    font-weight: 800;
    color: $menuBg;
    width: 100%;
    .name-box {
      width: 100%;
      height: 25px;
    }
    .quantity-box {
      margin-top: 5px;
      flex-grow: 100%;
      height: 25px;
    }
    .price-box {
      margin-top: 5px;
      flex-grow: 100%;
      height: 25px;
    }
  }
  .btn-group {
    display: grid;
    width: 50px;
    .btn-menu {
      font-weight: 800;
      text-align: center;
      margin: 0px;
      width: 40px;
      height: 20px;
    }
  }
}
</style>