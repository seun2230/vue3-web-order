<template>
  <div class="total">
    <div class="price">
      {{ totalPrice }}
    </div>
  </div>
</template>

<script>
export default {
    computed: {
        totalPrice() {
            console.log("computed:", this.$store);
            return this.$store.getters.totalPrice;
        }
    }
}
</script>