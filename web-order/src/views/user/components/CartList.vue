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
        결제하기
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
          console.log("server res", res.data)
          this.$store.commit("food/resetCart");
          this.$router.push('/')
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
    padding: 5px;
    .cart_item {
      display: flex;
    }
  }
  .btn-container {
    padding: 5px;
    width: 100%;
    height: 8vh;
    text-align: center;
    .btn-order {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: rgba(255, 0, 0, 0.7);
      border-radius: 9px;
      width: 100%;
      height: 80%;
      color: white;
      box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
      font-weight: 800;
      font-size: 1.3rem;
      letter-spacing: 1px;
      transition: ease-out 0.2s;
      transition-duration: 100ms;
    }
  }
  .btn-order:active {
    background-color: rgba(255, 0, 0, 0.5);
  }
}
</style>