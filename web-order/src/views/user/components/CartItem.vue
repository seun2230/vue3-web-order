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
@import '../../../scss/variables.scss';
span {
  width: 100%;
}

.container {
  display: flex;
  height: 105px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  .infos-container {
    display: grid;
    text-align: center;
    font-weight: 800;
    color: $menuBg;
    width: 100%;
    border-radius: 9px;
    margin-right: 10px;
    .name-box {
      width: 100%;
      background-color: $menuListInf2;
      border-radius: 9px;
      height: 25px;
    }
    .quantity-box {
      margin-top: 5px;
      flex-grow: 100%;
      background-color: $menuListInf1;
      border-radius: 9px;
      height: 25px;
    }
    .price-box {
      margin-top: 5px;
      flex-grow: 100%;
      background-color: $menuListInf2;
      border-radius: 9px;
      height: 25px;
    }
  }
  .btn-group {
    display: grid;
    width: 50px;
    background-color: $menuListCnt;
    border-radius: 9px;
    .menu-btn {
      margin: 0px;
      width: 40px;
      height: 20px;
    }
  }
}
</style>