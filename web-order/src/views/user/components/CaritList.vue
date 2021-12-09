<template>
  <div class="container">
    <div class="cartList">
      <CartItem
        class="cart_item"
        v-for="cart in carts"
        :key="cart.name"
        :cart="cart" />
    </div>
    <TotalPrice />
    <el-button
      type="text"
      class="yellow-btn"
      @click="submitCart(this.carts, this.totalPrice)">
      결제
    </el-button>
  </div>
</template>

<script>
import CartItem from './CartItem.vue'
import TotalPrice from './TotalPrice.vue'
import { mapGetters, mapState } from 'vuex'
import axios from 'axios'

export default {
  components: {
    CartItem,
    TotalPrice
    },
    computed: {
      ...mapState('food', [
        'carts'
      ]),
      ...mapGetters('food', [
        'totalPrice'
      ]),
      ...mapState('user', [
        'token'])
    },
    methods: {
      submitCart(carts, totalPrice) {
        let list = [ carts, totalPrice ]

        axios.post("http://localhost:3000/foods/post", 
          JSON.stringify(list),
          {
            headers: {
              "Content-Type": "application/json"
            }
          })
        .then((res) => {
          console.log("server res :", res.data)
          this.$store.commit('food/resetCart')
        })
        .catch(err => {
          console.error(err);
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../../scss/variables.scss';
@import '../../../scss/btn.scss';

.container {
  display: grid;
  background-color: $menuListBg;
  .cartList {
    background-color: $menuListCnt;
    min-height: 100px;
    padding: 10px;
    border-radius: 9px;
    margin: 10px;
    .cart_item {
      display: flex
    }
  }
  .yellow-btn {
    padding: 10px;
  }
}

</style>