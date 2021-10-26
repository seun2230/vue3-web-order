<template>
  <div class="total">
    <div class="price">
      {{ totalPrice }} 원
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

@import '../scss/main.scss';
  .total {
    text-align: center;
  }
</style>