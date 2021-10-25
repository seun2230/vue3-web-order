<template>
  <div class="total">
    <div class="price">
      {{ totalPrice }}
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