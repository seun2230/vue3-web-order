<template>
  <div class="container">
    <div>{{ coupon }}</div>
  </div>
</template>

<script>
export default {
  props: {
    coupon: {
      type: Object,
      default: function() { return {} }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>