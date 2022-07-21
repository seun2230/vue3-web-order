<template>
  <div class="container-child">
    <div
      v-if="hiddenPrice" 
      class="child-box">
      <label>총 금액</label>
      <span class="price">{{ totalPrice }} 원</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isHidden: false
    }
  },
  computed: {
    ... mapGetters('food', ['totalPrice']),
    hiddenPrice() {
      return this.totalPrice === 0 ? this.isHidden : !this.isHidden;
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';

.container-child {
  margin: 5px;
  padding: 5px;
  text-align: right;
  
  .child-box {
    font-size: 1.5rem;
    line-height: 20px;
    .price {
      font-size: 1.3rem;
      font-weight: bolder;
      color: #e73251;
    }
  }
}
</style>