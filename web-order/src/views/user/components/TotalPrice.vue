<template>
  <div class="container-child">
    <div class="message-box">
      <span class="message">총 금액</span>
    </div>
    <div class="price-box">
      <span class="price">{{ totalPrice }} 원</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ... mapGetters('food', ['totalPrice'])
  },
}
</script>

<style lang="scss" scoped>
@import '../../../scss/variables.scss';

.container-child {
  text-align: center;
  display: grid;
    margin: 5px;
  padding: 5px;
  border-radius: 9px;
  .message-box {
    width: 100%;
    height: 35px;
    padding: 5px;
    .message {
      font-size: 1.2rem;
      font-weight: 800;
      color: $menuBg;
    }
  }
  .price-box {
    margin-bottom: 5px;
    padding: 5px;
    width: 100%;
    border-radius: 9px;
    .price {
      font-size: 1.6rem;
      font-weight: 800;
      color: $menuBg;
    }
  }
}
</style>