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
      <div
        class="btn-order"
        type="text"
        @click="submitCart(this.carts, this.totalPrice)">
        결제
      </div>
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

      axios.post(`${process.env.VUE_APP_URL}/api/food/post/foodOrder`, 
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
  width: 100%;
  .cartList {
    min-height: 100px;
    // border-radius: 9px;
    padding: 5px;
    // box-shadow: 2px 2px 2px 2px rgba(160, 160, 160, 0.445);
    .cart_item {
      display: flex;
    }
  }
  .btn-container {
    padding: 5px;
    width: 100%;
    text-align: center;
    .btn-order {
      padding: 5px;
      border-radius: 9px;
      width: 100%;
      color: $menuBg;
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
      font-weight: 800;
    }
  }
}
</style>