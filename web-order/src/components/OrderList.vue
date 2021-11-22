<template>
  <div class="container">
    <div class="inner">
      <div class="order">
        <OrderItem
          v-for="order in order"
          :key="order.id_order_list"
          :order="order" />
      </div>
    </div>
  </div>
  {{ order.data }}
</template>

<script>
import { mapState } from 'vuex'
import OrderItem from './OrderItem.vue'

export default {
  components: {
    OrderItem
  },
  created() {
    this.$store.commit("food/getOrder")
  },
  computed: {
    ...mapState('food', [
      'order'
    ])
  }
}
</script>