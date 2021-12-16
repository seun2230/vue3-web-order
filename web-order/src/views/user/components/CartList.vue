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
    <div class="btn-container">
      <el-button
        type="text"
        class="menu-btn"
        @click="submitCart(this.carts, this.totalPrice)">
        결제
      </el-button>
    </div>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import TotalPrice from "./TotalPrice.vue";
import { mapGetters, mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
    }
  },
  components: {
    CartItem,
    TotalPrice,
  },
  computed: {
    ...mapState("food", ["carts"]),
    ...mapGetters("food", ["totalPrice"]),
  },
  methods: {
    submitCart(carts, totalPrice) {
      let list = [carts, totalPrice];

<<<<<<< HEAD
      axios.post(`${process.env.VUE_APP_URL}/api/food/post/foodOrder`, 
=======
      axios.post("http://localhost:3000/api/food/post/foodOrder",
>>>>>>> 41a1409151208ce2b57e40d8143855411886e8b9
        JSON.stringify(list), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("server res :", res.data);
          this.$store.commit("food/resetCart");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../scss/variables.scss";
@import "../../../scss/btn.scss";

.container {
  display: grid;
  background-color: $menuListBg;
  border-radius: 9px;
  .cartList {
    background-color: $menuListCnt;
    min-height: 125px;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 10px;
    border-radius: 9px;
    margin: 10px;
    .cart_item {
      display: flex;
    }
  }
  .btn-container {
    display: flex;
    padding: 10px;
  }
}
</style>