<template>
  <div class="infos">
    <div class="name">
      {{ order.food_name }}
    </div>
    <div class="quantity">
      {{ order.order_quantity }}
    </div>
    <div class="price">
      {{ order.order_total_price }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
  
}
</script>