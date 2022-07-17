<template>
  <div class="title">
    <div class="arrow">
      <button 
        @click="Backward"
        class="backwardBtn">
        <i 
          class="fas fa-arrow-left" 
          id="backward"></i>
      </button>
    </div>
    <div class="routerMeta">
      <span>{{ currentRouteMeta }}</span>
    </div>
    <div 
      class="icon-cart"
      @click="moveCartPage()">
      <i class="fas fa-shopping-cart"></i>
      <span 
        class="cart__total"
        v-if="carts.length >= 1">
        {{ carts.length }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods: {
    Backward() {
      this.$router.go(-1);
    },
    moveCartPage() {
      this.$router.push('mypage');
    }
  },
  computed: {
    ...mapState("food", ["carts"]),
    currentRouteMeta() {
      return this.$route.meta.metaName;

    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";

#backward {
  transition: ease-out 100ms;
  transition-duration: 300ms;
}
#backward:active {
  color: rgba(255, 0, 0, 0.2);
}

button {
  border: none;
  background-color: white;
}

button:hover {
  cursor: pointer;
}
.title {
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  width: 100%;
  min-height: 55px;
  border-bottom: 1px solid #bcbcbc;
  z-index: 10; 
  color: $gray-900;
  text-align: center;

  .backwardBtn {
    font-size: 1.3rem;
    margin-left: 5px;
    flex: 1;
  }
  .routerMeta {
    width: 320px;
    justify-content: center;
    flex: 3;
    font-size: 1.4rem;
    font-weight: bold;
  }
  .icon-cart {
    width: 50px;
    height: 20px;
    font-size: 1.2rem;
    .cart__total {
      width: 15px;
      height: 15px;
      border-radius: 25%;
      padding: 2px;
      position: fixed;
      top: 7px;
      right: 7px;
      background-color: #e73251;
      color: #fff;
      text-align: center;
      font-size: 13px;
    }
  }
}
</style>
