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
  background-color: $menuListCnt;
  height: 150px;
  margin: 10px;
  padding: 10px;
  border-radius: 9px;
  .message-box {
    width: 100%;
    padding: 10px;
    background-color: $menuListInf1;
    border-radius: 9px;
    .message {
      font-size: x-large;
      font-weight: 800;
      color: $menuBg;
    }
  }
  .price-box {
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    background-color: $menuListInf2;
    border-radius: 9px;
    .price {
      font-size: xx-large;
      font-weight: 800;
      color: $menuBg;
    }
  }
}
</style>