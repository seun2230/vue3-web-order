<template>
  <div class="total">
    <h1 class="message">
      총 금액 :
    </h1>
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