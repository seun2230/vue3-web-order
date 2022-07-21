<template>
  <div 
    class="container">
    <div
      class="section-cart"
      v-if="onCart">
      <div 
        class="cartList">
        <CartItem
          class="cart_item"
          v-for="cart in carts"
          :key="cart.name"
          :cart="cart" />
      </div>
      <CartTotalPrice />
    </div>
    <div class="section-button">
      <button
        class="btn--orange btn--xl"
        type="text"
        @click="submitCart(this.carts, this.totalPrice)">
        결제하기
      </button>
    </div>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import CartTotalPrice from "./CartTotalPrice.vue";
import { mapGetters, mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      show: false,
    }
  },
  components: {
    CartItem,
    CartTotalPrice,
  },
  computed: {
    ...mapState("food", ["carts"]),
    ...mapGetters("food", ["totalPrice"]),
    onCart() {
      return this.carts.length === 0 ? this.show : !this.show;
    }
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
@import "@/scss/variables.scss";
@import "@/scss/btn.scss";

.container {
  display: grid;
  width: 100%;
  .section-cart {
    position: fixed;
    width: 100%;
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
    background: linear-gradient(#fdfafaf6, #fff);
    box-shadow: 2px 2px 5px #0000001a;;
    bottom: 142px;
    z-index: 2;
    .cartList {
      min-height: 100px;
      padding: 5px;
      .cart_item {
        display: flex;
      }
    }
  }
  .section-button {
    width: 100%;
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 98px;
    .btn--orange .btn--xl {
      border-radius: none;
    }
  }
}
</style>