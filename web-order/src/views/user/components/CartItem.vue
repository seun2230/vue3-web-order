<template>
  <div class="container">
    <div class="infos-container">
      <div class="name-box">
        {{ cart.food_name }}
      </div>
      <div class="quantity-box">
        <span class="quantity">{{ cart.quantity }} 개</span>
      </div>
      <div class="price-box">
        <span class="price">{{ cart.food_price * cart.quantity }} 원</span>
      </div>
    </div>
    <div class="btn-group">
      <el-button
        type="text"
        class="menu-btn"
        @click="removeCart(this.cart)">
        -
      </el-button>
      <el-button
        type="text"
        class="menu-btn"
        @click="realRemoveCart(this.cart)">
        X
      </el-button>
      <el-button
        type="text"
        class="menu-btn"
        @click="addCart(this.cart)">
        +
      </el-button>
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
.container {
  display: flex;
  height: 34px;
  width: 100%;
  padding: 2px;
  .infos-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .name-box {
      width: 20%;
    }
    .price-box {
      flex-grow: 1;
    }
    .quantity-box {
      flex-grow: 1;
    }
  }
  .btn-group {
    width: 100%;
    flex-direction: flex-end ;
    .menu-btn {
      width: 30px;
      height: 30px;
    }
  }
}
</style>